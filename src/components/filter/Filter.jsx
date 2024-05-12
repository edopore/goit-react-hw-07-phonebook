import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div className="submit-form flex mb-2">
        <label htmlFor="find">Find contacts by Name</label>
        <input
          onChange={this.props.filterContacts}
          type="text"
          name="query"
          placeholder="John Doe..."
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </div>
    );
  }
}
Filter.propTypes = {
  filterContacts: PropTypes.func,
};
