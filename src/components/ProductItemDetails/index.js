import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    idObjectData: '',
    totalCount: 1,
  }

  componentDidMount() {
    this.getProduct()
  }

  getSimilarProducts = eachObject => ({
    id: eachObject.id,
    imageUrl: eachObject.image_url,
    title: eachObject.title,
    style: eachObject.style,
    price: eachObject.price,
    description: eachObject.description,
    brand: eachObject.brand,
    totalReviews: eachObject.total_reviews,
    rating: eachObject.rating,
    availability: eachObject.availability,
  })

  getProduct = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    //  console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      const objectData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        price: data.price,
        description: data.description,
        availability: data.availability,
        similarProducts: data.similar_products.map(eachObject =>
          this.getSimilarProducts(eachObject),
        ),
      }

      this.setState({idObjectData: objectData})
    }
    // console.log(data)
    // const data = await response.json()
    // console.log(response)
    // if (response.ok === true) {
    //   console.log(data)
    // }
    // const data = await response.json()
    // console.log(response)
  }

  render() {
    const {idObjectData, totalCount} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
      similarProducts,
    } = idObjectData
    console.log(similarProducts)
    return (
      <div>
        <Header />
        <div className="bg-card-container">
          <img src={imageUrl} alt="product" className="image-product" />
          <div className="heading-container">
            <h1>{title}</h1>
            <p>Rs {price}</p>
            <div className="rating-reviews">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-image"
                />
              </div>
              <p className="total-reviews">{totalReviews}</p>
            </div>
            <p>{description}</p>
            <p>
              Available: <span>{availability}</span>
            </p>
            <p>
              Brand: <span>{brand}</span>
            </p>
            <hr className="horizontal-line" />
            <div className="button-Container">
              <button type="button">-</button>
              <p className="count-total">{totalCount}</p>
              <button type="button">+</button>
            </div>
            <button type="button" className="add-cart">
              ADD TO CART
            </button>
          </div>
        </div>
        <div>
          <h1 className="heading-products">Similar Products</h1>
          {similarProducts.map(eachObject => (
            <SimilarProductItem EachObjectProduct={eachObject} />
          ))}
        </div>
      </div>
    )
  }
}

export default ProductItemDetails
