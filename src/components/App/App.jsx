import { Component } from 'react';
import { fetchData } from 'services/pixabay-API';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    inputValue: null,
    images: [],
    page: 1,
    isLoading: false,
    isLoadingMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { inputValue, page } = this.state;

    if (prevState.inputValue !== inputValue) {
      this.setState({ isLoading: true });

      fetchData(inputValue, page)
        .then(cards => this.setState({ images: [...cards] }))
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading: false }));
    }

    if (page !== prevState.page) {
      this.setState({ isLoadingMore: true });

      fetchData(inputValue, page)
        .then(cards =>
          this.setState(prevState => ({
            images: [...prevState.images, ...cards],
          }))
        )
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoadingMore: false }));
    }
  }

  getInputValue = value => {
    this.setState({ inputValue: value, page: 1 });
  };

  onLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, isLoadingMore, page } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.getInputValue} />
        {isLoading && <Loader />}
        {!isLoading && <ImageGallery data={this.state.images} />}
        {isLoadingMore && page > 1 && <Loader />}
        {!isLoadingMore && !isLoading && images.length > 0 && (
          <LoadMore onLoad={this.onLoad} />
        )}
      </Container>
    );
  }
}
