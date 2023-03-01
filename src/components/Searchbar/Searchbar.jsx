import { Formik, Form } from 'formik';
import {
  Searchbar,
  SearchButton,
  SearchLabel,
  Input,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

const SearchBar = props => {
  const initialValues = {
    inputValue: '',
  };

  const handleSubmit = ({ inputValue }, { resetForm }) => {
    if (inputValue.trim() === '') {
      return alert('Nothing to search!');
    }

    props.onSubmit(inputValue);
    resetForm();
  };

  return (
    <Searchbar>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <SearchButton type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchButton>
          <Input
            type="text"
            name="inputValue"
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { SearchBar };
