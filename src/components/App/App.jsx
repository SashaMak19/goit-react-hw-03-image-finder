import { Component } from 'react';
import { fetchData } from 'services/pixabay-API';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';
import { animateScroll } from 'react-scroll';
export class App extends Component {
  state = {
    query: null,
    images: [],
    page: 1,
    isLoading: false,
    showLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    console.log(page);

    if (page !== prevState.page || query !== prevState.query) {
      this.setState({
        isLoading: true,
      });

      fetchData(query, page)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            showLoadMore: page < Math.ceil(data.totalHits / 12),
          }));
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  getQueryValue = value => {
    this.setState({ query: value, page: 1, images: [] });
  };

  onLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    animateScroll.scrollMore(900, { duration: 1500, delay: 100, smooth: true });
  };

  render() {
    const { images, isLoading, showLoadMore } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.getQueryValue} />
        <ImageGallery data={images} />
        {isLoading && <Loader />}
        {!isLoading && showLoadMore && <LoadMore onLoad={this.onLoad} />}
      </Container>
    );
  }
}
