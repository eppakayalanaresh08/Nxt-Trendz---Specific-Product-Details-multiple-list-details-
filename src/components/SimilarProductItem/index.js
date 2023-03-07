const SimilarProductItem = props => {
  const {EachObjectProduct} = props
  console.log(EachObjectProduct)
  const {imageUrl, title, brand, price, rating} = EachObjectProduct
  return (
    <div>
      <img src={imageUrl} alt={`similar product ${title}`} />
      <p>{title}</p>
      <p>by {brand}</p>
      <div>
        <p>RS {price}</p>
        <div className="container-rating">
          <p className="">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </div>
  )
}

export default SimilarProductItem
