import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';



class Movies extends React.Component {

  render() {
    return (
      <>

        {
          this.props.showCard &&
                    this.props.movies.map(element => {
                      return (<Card style={{ border: 'groove', width: '500px' }} >
                        <Card.Header as="h5">
                          {element.title}
                        </Card.Header>
                        <Card.Header as="h5">
                          <img class="card-img-top" src={element.poster_path} alt="movies"/>
                        </Card.Header>
                        <Card.Header as="h5">
                          {element.vote_average}
                        </Card.Header>
                        <Card.Header as="h5">
                          {element.vote_count}
                        </Card.Header>
                        <Card.Header as="h5">
                          {element.overview}
                        </Card.Header>
                        <Card.Header as="h5">
                          {element.popularity}
                        </Card.Header>
                        <Card.Header as="h5">
                          {element.release_date}
                        </Card.Header>
                      </Card>
                      );
                    })
        }


      </>
    );
  }


}

export default Movies;
