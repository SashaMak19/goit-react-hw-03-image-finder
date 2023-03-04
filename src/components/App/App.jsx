import { Component } from 'react';
import { fetchData } from 'services/pixabay-API';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    query: null,
    images: [],
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    console.log(page);

    if (page !== prevState.page || query !== prevState.query) {
      this.setState({
        isLoading: true,
      });

      // console.log(prevState.images);

      fetchData(query, page)
        .then(images => {
          console.log(`Попередні`, prevState.images);
          console.log(`Ті що прийшли`, images);
          this.setState({ images: [...prevState.images, ...images] });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoading: false }));
      // document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  getQueryValue = value => {
    this.setState({ query: value, page: 1, images: [], isLoading: false });
    console.log('getQueryValue');
  };

  onLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('onLoad');
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.getQueryValue} />
        {isLoading && <Loader />}
        {!isLoading && <ImageGallery data={images} />}
        {/* {page > 1 && <Loader />} */}
        {!isLoading && images.length > 0 && <LoadMore onLoad={this.onLoad} />}
      </Container>
    );
  }
}
