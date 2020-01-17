import createStore from 'unistore';
import axios from 'axios';

const initState = {
  search:""
};
const urlCart = 'http://0.0.0.0:5000/cart';
export const store = createStore(initState);

export const actions = (store) => ({
  pushToCart: (...restArgument) => {
    // console.warn(restArgument)
    if (restArgument[0] == undefined) {
      alert('Please Login First');
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${restArgument[0]}`,
        },
      };
      const data = {
        item_id: restArgument[1],
      };
      axios.post(urlCart, data, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  },

  handleSearchChange: (e) => {
    store.setState({[e.target.name]:e.target.value})
  }
  
});
