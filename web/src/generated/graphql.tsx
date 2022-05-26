import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  addressLine1: Scalars['String'];
  addressLine2: Scalars['String'];
  categoryId: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['Float'];
  mobile: Scalars['Float'];
  zipcode: Scalars['String'];
};

export type Brand = {
  __typename?: 'Brand';
  brandLogo: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type DisCount = {
  __typename?: 'DisCount';
  code: Scalars['String'];
  discountId: Scalars['String'];
  discountPercentage: Scalars['Float'];
};

export type Errors = {
  __typename?: 'Errors';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  errors: Array<Errors>;
  isOk: Scalars['Boolean'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  name: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ImageResponse = {
  __typename?: 'ImageResponse';
  images: Array<Image>;
  message: Scalars['String'];
};

export type Inventory = {
  __typename?: 'Inventory';
  currency: Scalars['String'];
  inventoryId: Scalars['String'];
  maxNumberOfUnitsPerCustomer: Scalars['Float'];
  price: Scalars['Float'];
  productId: Scalars['String'];
  skuCode: Scalars['String'];
  stock: Scalars['Float'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  errors: Array<Errors>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddress: Scalars['Boolean'];
  addCategory: Scalars['Boolean'];
  addImage: Scalars['Boolean'];
  addImageToProduct: Scalars['Boolean'];
  addProduct: Scalars['Boolean'];
  checkAuth: Scalars['String'];
  createInventory: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: UserCreationResponse;
  registerBrand: Scalars['Boolean'];
  registerDiscount: Scalars['Boolean'];
  resetPassword: UserCreationResponse;
  tagProductWithDiscount: GenericResponse;
  tagProductWithDiscountCode: GenericResponse;
  tagProductWithInventory: Scalars['Boolean'];
};


export type MutationAddAddressArgs = {
  addressLine1: Scalars['String'];
  addressLine2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  mobile: Scalars['Float'];
  zipcode: Scalars['String'];
};


export type MutationAddCategoryArgs = {
  categoryName: Scalars['String'];
  imageUrl: Scalars['String'];
};


export type MutationAddImageArgs = {
  name: Scalars['String'];
  url: Scalars['String'];
};


export type MutationAddImageToProductArgs = {
  imageName: Scalars['String'];
  imageUrl: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationAddProductArgs = {
  brand: Scalars['String'];
  description: Scalars['String'];
  productName: Scalars['String'];
};


export type MutationCreateInventoryArgs = {
  currency: Scalars['String'];
  price: Scalars['Float'];
  productId: Scalars['String'];
  stock: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterBrandArgs = {
  brandLogo: Scalars['String'];
  name: Scalars['String'];
};


export type MutationRegisterDiscountArgs = {
  code: Scalars['String'];
  percentage: Scalars['Float'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationTagProductWithDiscountArgs = {
  discountId: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationTagProductWithDiscountCodeArgs = {
  discountCode: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationTagProductWithInventoryArgs = {
  inventoryId: Scalars['String'];
  productId: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  SKU: Scalars['String'];
  applicabeDiscountIds?: Maybe<Array<DisCount>>;
  brand?: Maybe<Brand>;
  category: ProductCategory;
  description: Scalars['String'];
  entityCategoryId: Scalars['String'];
  images?: Maybe<Array<Image>>;
  inventory?: Maybe<Inventory>;
  name: Scalars['String'];
  productId: Scalars['String'];
  upvotes: Scalars['Float'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  product?: Maybe<Product>;
};

export type Query = {
  __typename?: 'Query';
  getImages: ImageResponse;
  getProducts: Array<Product>;
  getTrendingProducts: Array<Product>;
  hello: Scalars['String'];
  helloFromProductCategory: Scalars['String'];
  me: User;
  whoami: User;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  categoryId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
  wishlistId: Scalars['String'];
};

export type UserCreationResponse = {
  __typename?: 'UserCreationResponse';
  errors: Array<Errors>;
  message: Scalars['String'];
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, errors: Array<{ __typename?: 'Errors', field: string, message: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserCreationResponse', message: string, errors: Array<{ __typename?: 'Errors', field: string, message: string }> } };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserCreationResponse', message: string, errors: Array<{ __typename?: 'Errors', field: string, message: string }> } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'Product', productId: string, name: string, SKU: string, images?: Array<{ __typename?: 'Image', name: string, url: string, id: string }> | null | undefined }> };

export type GetTrendingProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendingProductsQuery = { __typename?: 'Query', getTrendingProducts: Array<{ __typename?: 'Product', productId: string, name: string, SKU: string, upvotes: number, inventory?: { __typename?: 'Inventory', price: number, currency: string, stock: number } | null | undefined, brand?: { __typename?: 'Brand', name: string, brandLogo: string } | null | undefined, images?: Array<{ __typename?: 'Image', name: string, url: string, id: string }> | null | undefined }> };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoami: { __typename?: 'User', username: string, email: string } };


export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    accessToken
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(username: $username, password: $password, email: $email) {
    errors {
      field
      message
    }
    message
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $token: String!) {
  resetPassword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    message
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const GetProductsDocument = gql`
    query GetProducts {
  getProducts {
    productId
    name
    SKU
    images {
      name
      url
      id
    }
  }
}
    `;

export function useGetProductsQuery(options: Omit<Urql.UseQueryArgs<GetProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProductsQuery>({ query: GetProductsDocument, ...options });
};
export const GetTrendingProductsDocument = gql`
    query GetTrendingProducts {
  getTrendingProducts {
    productId
    name
    SKU
    inventory {
      price
      currency
      stock
    }
    upvotes
    brand {
      name
      brandLogo
    }
    images {
      name
      url
      id
    }
  }
}
    `;

export function useGetTrendingProductsQuery(options: Omit<Urql.UseQueryArgs<GetTrendingProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTrendingProductsQuery>({ query: GetTrendingProductsDocument, ...options });
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};
export const WhoAmIDocument = gql`
    query WhoAmI {
  whoami {
    username
    email
  }
}
    `;

export function useWhoAmIQuery(options: Omit<Urql.UseQueryArgs<WhoAmIQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WhoAmIQuery>({ query: WhoAmIDocument, ...options });
};