const baseApiUrl = "https://balandrau.salle.url.edu/i3/socialgift/api/v1";
const baseApiProducts = "https://balandrau.salle.url.edu/i3/mercadoexpress/api/v1";

// User Management
export const loginUser = `${baseApiUrl}/users/login`;
export const searchUser = `${baseApiUrl}/users/search`;
export const singUpUser = `${baseApiUrl}/users`;
export const removeUser = `${baseApiUrl}/users`; // DELETE
export const getUserById = `${baseApiUrl}/users`;
export const updateUser = `${baseApiUrl}/users`;

// WishList Management
export const createWishlist = `${baseApiUrl}/wishlists`;
export const getWishlists = `${baseApiUrl}/wishlists`;
export const editWishlists = `${baseApiUrl}/wishlists`;

// Message Managemenet
export const messageBase = `${baseApiUrl}/messages`;
export const messageClientChatRoom = `${baseApiUrl}/messages/ServerInfo`;


// Friends Management
export const addFriend = `${baseApiUrl}/friends`;
export const acceptPutFriend = `${baseApiUrl}/friends`;
export const rejectDeleteFriend = `${baseApiUrl}/friends`;
export const getFriends = `${baseApiUrl}/friends`;
export const getFriendRequests = `${baseApiUrl}/friends/requests`;

// Products
export const getAllProducts = `${baseApiProducts}/products`
export const getProductById = `${baseApiProducts}/products`
export const createProduct = `${baseApiProducts}/products`
export const modifyProductById = `${baseApiProducts}/products`
export const searchProducts = `${baseApiProducts}/products/search`