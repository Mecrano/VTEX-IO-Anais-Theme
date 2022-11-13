export const initialLoad = (e) => {
  // This function is called when document is ready
}

export const orderFormUpdate = (orderForm) => {
  // This function is called every time orderForm is updated
}

export const stepStart = (e) => {
  $('.header-breadcrumb > .breadcrumb-item').removeClass('active').removeClass('completed')
  $('.header-breadcrumb > .breadcrumb-item:first-child').addClass('active')
}
