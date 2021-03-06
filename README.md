# Shop App

A page replicated a shopping app which fetch data from a real backend server. You can go and buy your favorite product!

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See products, inspect them
- Add products to cart, checkout
- Login, Register and Logout

### Screenshot

![](./screenshot.png)

### Links

- You can view the page live here: (https://manhtran1611.github.io/ShopApp/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Javascript
- Axios
- REACTJS
- REDUX
- MATERIAL UI
- JSS

### What I learned

```js
export const loginUser = createAsyncThunk<
  Response,
  InputUser,
  { rejectValue: ValidationErrors }
>("user/login", async (user, { rejectWithValue }) => {
  try {
    const response = await ProductDataService.loginUser(user);
    API.defaults.headers.common = { Authorization: response.data.token };
    return response.data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});
```

### Continued development

I will continue to develop this app. It does not have a lot of functionality as of now. I'd like to add categories and search bar for people to find the products more easily.

## Author

- Frontend Mentor - [@manhtran1611](https://www.frontendmentor.io/profile/manhtran1611)
- Git hub - [@manhtran1611](https://github.com/manhtran1611)
