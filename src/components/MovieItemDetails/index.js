import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import {FaPlay} from 'react-icons/fa'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import LoaderView from '../Loader'
import FailureView from '../FailureView'
import Footer from '../Footer'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    MovieItemDetailsStatus: apiStatus.initial,
    MovieDetails: [],
  }

  componentDidMount() {
    this.getMovieItemDetailsList()
  }

  retryMovieDetailList = () => {
    this.getMovieItemDetailsList()
    this.onClickMovie()
  }

  onClickMovie = id => {
    ;<Redirect to={`/movies/${id}`} />
    this.getMovieItemDetailsList()
  }

  getMovieItemDetailsList = async () => {
    this.setState({MovieItemDetailsStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )

    if (response.ok) {
      const fetchedData = await response.json()

      const MovieDetails = {
        adult: fetchedData.movie_details.adult,
        backdropPath: fetchedData.movie_details.backdrop_path,
        budget: fetchedData.movie_details.budget,
        id: fetchedData.movie_details.id,
        overview: fetchedData.movie_details.overview,
        posterPath: fetchedData.movie_details.poster_path,
        releaseDate: fetchedData.movie_details.release_date,
        runtime: fetchedData.movie_details.runtime,
        title: fetchedData.movie_details.title,
        voteAverage: fetchedData.movie_details.vote_average,
        voteCount: fetchedData.movie_details.vote_count,
        genres: fetchedData.movie_details.genres,
        spokenLanguages: fetchedData.movie_details.spoken_languages,
        similarMovies: fetchedData.movie_details.similar_movies,
      }

      this.setState({
        MovieDetails,
        MovieItemDetailsStatus: apiStatus.success,
      })
    } else {
      this.setState({
        MovieItemDetailsStatus: apiStatus.failure,
      })
    }
  }

  successView = () => {
    const {MovieDetails} = this.state
    const {genres, similarMovies, spokenLanguages} = MovieDetails
    const updatedSimilarMovies = similarMovies.map(a => ({
      backdropPath: a.backdrop_path,
      id: a.id,
      posterPath: a.poster_path,
      title: a.title,
    }))
    return (
      <div>
        <div
          className="Home_poster"
          style={{
            backgroundSize: 'cover',

            backgroundImage: `url(${MovieDetails.backdropPath})`,
          }}
        >
          <Header />
          <div className="vertical">
            <div className="horizontal">
              <h1 className="Home_poster_title">{MovieDetails.title}</h1>
              <div className="Movie_details">
                <p>
                  {`${Math.floor(MovieDetails.runtime / 60)}h ${
                    MovieDetails.runtime % 60
                  }m `}
                </p>
                <p className="UA">{MovieDetails.adult ? 'A' : 'U/A'}</p>
                <p>{format(new Date(MovieDetails.releaseDate), 'yyyy')}</p>
              </div>
              <p className="Home_poster_overview">{MovieDetails.overview}</p>
              <div className="buttons_card">
                <button type="button" className="watch_button">
                  <FaPlay size={13} /> Play
                </button>
                <button type="button" className="infoButton">
                  + MY LIST
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="movie_details_middle_card">
          <ul className="genre-cont">
            <h1 className="movie_details_middle_card_heading">genres</h1>

            {genres.map(a => (
              <li className="movie_details_middle_card_values" key={a.id}>
                <p>{a.name}</p>
              </li>
            ))}
          </ul>

          <ul className="genre-cont">
            <h1 className="movie_details_middle_card_heading">
              Audio Available
            </h1>
            {spokenLanguages.map(a => (
              <li className="movie_details_middle_card_values" key={a.id}>
                <p>{a.english_name}</p>
              </li>
            ))}
          </ul>
          <ul>
            <h1 className="movie_details_middle_card_heading">Rating Count</h1>
            <p className="movie_details_middle_card_values">
              {MovieDetails.voteCount}
            </p>
            <h1 className="movie_details_middle_card_heading">
              Rating Average
            </h1>
            <p className="movie_details_middle_card_values">
              {MovieDetails.voteAverage}
            </p>
          </ul>
          <ul>
            <h1 className="movie_details_middle_card_heading">Budget</h1>
            <p className="movie_details_middle_card_values">
              {MovieDetails.budget}
            </p>
            <h1 className="movie_details_middle_card_heading">Release Date</h1>
            <p className="movie_details_middle_card_values">
              {format(new Date(MovieDetails.releaseDate), 'do MMMM Y')}
            </p>
          </ul>
        </div>
        <h1 className="MoreLikeThis">More like this</h1>
        <ul className="similar_movies_list">
          {updatedSimilarMovies.map(a => (
            <li key={a.id}>
              <img className="details_image" src={a.posterPath} alt={a.title} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  MovieItemDetailsList = () => {
    const {MovieItemDetailsStatus} = this.state

    switch (MovieItemDetailsStatus) {
      case apiStatus.success:
        return this.successView()
      case apiStatus.inProgress:
        return (
          <div className="movieDetails_other_views">
            <LoaderView />
          </div>
        )
      case apiStatus.failure:
        return (
          <div className="movieDetails_other_views">
            <FailureView retry={this.retryMovieDetailList} />
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie_item_details_container">
        {this.MovieItemDetailsList()}
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails
