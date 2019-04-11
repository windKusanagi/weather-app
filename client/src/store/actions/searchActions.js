import axios from "axios";

const place_api_base_url =
	"https://maps.googleapis.com/maps/api/place/autocomplete/json?input=";
const place_api_params = "&types=(cities)&key=AIzaSyAr2kx5Oyf71opktyc7MvCsQ0Knbj40HnI"

export const searchForCity = searchStr => {
	return dispatch => {
		axios
		.get(`${place_api_base_url}${searchStr}${place_api_params}`)
		.then(rsp => {
			console.log(rsp.data)
		})
		.catch(err => {
			console.log("there is an err", err);

		});
	}
}