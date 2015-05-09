/** @jsx React.DOM */

var React = require('react');
var classNames = require('classnames');

var ratings = data.ratings;
var tiers = data.tiers;

var ALL = 'All'

var App = React.createClass({

  getInitialState: function() {
    return {
      active: window.location.hash.slice(1) || ALL
    };
  },

  handleLinkClick: function(current) {
    this.setState({
      active: current
    });
  },

  renderH3: function(text){
    return <h3>{text}</h3>
  },

  renderH4: function(text){
    return <h4>{text}:</h4>
  },

  renderLinks: function() {
    links = [];
    for (rating in ratings){
      var classes = classNames({active: this.state.active === rating});

      links.push(
        <li key={rating} role="presentation" className={classes}>
          <a href={'#' + rating} onClick={this.handleLinkClick.bind(null, rating)}>
            {rating}
          </a>
        </li>
      );
    }
    return (
      <ul className="nav nav-pills nav-stacked">
        {links}
      </ul>
    );
  },

  renderAreas: function() {
    var areaItems = [];
    for (var area in tiers){
      var neighborhood = tiers[area];
      neighborhoodList = this.renderNeighborhoods(neighborhood);

      if (neighborhoodList !== undefined){
        areaItems.push(
          <li key={area}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">{area}</h3>
              </div>
              <div className="panel-body">
                {neighborhoodList}
              </div>
            </div>
          </li>
        );
      }
    }

    if (areaItems.length > 0){
      return (
        <ul className='list-unstyled'>
          {areaItems}
        </ul>
      );
    }
  },

  renderNeighborhoods: function(neighborhoods) {
    var neighborhoodItems = [];
    for (var neighborhood in neighborhoods){
      var restaurants = neighborhoods[neighborhood];
      restaurantsList = this.renderRestaurants(restaurants);

      if (restaurantsList !== undefined){
        neighborhoodItems.push(
          <li key={neighborhood}>
            <h4>{neighborhood}</h4>
            {restaurantsList}
          </li>
        );
      }
    }

    if (neighborhoodItems.length > 0){
      return (
        <ul className='list-unstyled'>
          {neighborhoodItems}
        </ul>
      );
    }
  },

  renderRestaurants: function(restaurants) {
    var restaurantsList = [];
    for (var restaurant in restaurants){
      var rating = restaurants[restaurant];

      if (this.state.active === ALL || this.state.active === rating){

        var classType = ratings[rating].classType

        restaurantsList.push(
          <dt key={restaurant + "dt"}>
            {restaurant}
          </dt>
        );

        restaurantsList.push(
          <dd key={restaurant + "dd"} className={classType}>
            {rating}
          </dd>
        );
      }
    }

    if (restaurantsList.length > 0){
      return (
        <dl className="dl-horizontal">
          {restaurantsList}
        </dl>
      );
    }
  },

  renderRatings: function() {
    var ratingsList = [];
    for (var rating in ratings){
      if (rating !== ALL){
        var ratingItem = ratings[rating];
        var description = ratingItem.description;
        var classType = ratingItem.classType

        ratingsList.push(
          <dt key={rating + "dt"} className={classType}>
            {rating}
          </dt>
        )

        ratingsList.push(
          <dd key={rating + "dd"}>
            {description}
          </dd>
        )
      }
    }

    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">Ratings</h3>
        </div>
        <div className="panel-body">
          <dl className="dl-horizontal">
            {ratingsList}
          </dl>
        </div>
      </div>
    );
  },

  render: function() {
    return (

      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="jumbotron">
              <h1>The Tier System</h1>
              <h3><small>according to <strong>Whitney Sorenson</strong></small></h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-3">
            {this.renderLinks()}
          </div>


          <div className="col-xs-12 col-sm-9">
            {this.renderAreas()}
          </div>

        </div>

        <div className="row">
          <div className="col-xs-12">
            {this.renderRatings()}
          </div>
        </div>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.body);
