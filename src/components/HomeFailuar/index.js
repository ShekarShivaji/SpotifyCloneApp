import './index.css'

const HomeFailuar = props => {
  const {getData} = props
  const onClickCallFunction = () => {
    getData()
  }
  return (
    <div className="home-failuar-container" data-testid="homeFailuarContainer">
      <img
        className="failuar-img"
        src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740982653/Icon_oxsmym.png"
        alt="failure view"
      />
      <p className="failuar-text">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={onClickCallFunction}
        className="failuar-button"
      >
        Try again
      </button>
    </div>
  )
}

export default HomeFailuar
