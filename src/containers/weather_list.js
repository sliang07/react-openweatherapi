import React, {Component} from 'react';
import { connect } from 'react-redux';
import Chart from '../Components/chart';
import _ from 'lodash';
import GoogleMap from '../Components/google_map';

class WeatherList extends Component {
	renderWeather(cityData) {
		const name = cityData.city.name;
		const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => 1.8 * (temp - 273) + 32);
		const pressures = cityData.list.map(weather => weather.main.pressure);
		const humidities = cityData.list.map(weather => weather.main.humidity);
		const { lon, lat } = cityData.city.coord;

		return (
			<tr key={name}>
				<td><GoogleMap lon={lon} lat={lat} /></td>
				<td><Chart data={temps} color="orange" unit ="F" /></td>
				<td><Chart data={pressures} color="blue" unit="hPa"/></td>
				<td><Chart data={humidities} color="black" unit="%"/></td>
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (F)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	}
}

function mapStateToProps({ weather }) {
	return { weather };
}

export default connect(mapStateToProps)(WeatherList);