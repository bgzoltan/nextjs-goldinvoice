// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type State = {
  name: string;
  code: string;
};

export type Country = {
  name: string;
  code: string;
};

export type Address = {
  country: Country;
  state: State;
  postCode: string;
  town: string;
  street: string;
  houseNo: string;
  flatNo: string;
};

export type Phone = {
  phone1: string;
  phone2: string;
};

export type Email = {
  email1: string;
  email2: string;
};

export type Company = {
  id: string;
  name: string;
  address: Address;
  email: Email;
  phone: Phone;
  web: string;
};

export type CompanyDTO = {
  id: string;
  name: string;
  country_name: string;
  country_code: string;
  state_name: string;
  state_code: string;
  post_code: string;
  town: string;
  street: string;
  house_no: string;
  flat_no: string;
  email1: string;
  email2: string;
  phone1: string;
  phone2: string;
  web: string;
};

export type Customer = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

export interface CreateModifyCustomer extends Omit<Customer, "id"> {
  userImage: File;
}

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export enum MessageType {
  Error = "Error",
  Information = "Information",
  Empty = "",
}

export interface Message {
  type: MessageType;
  content: string;
  show: boolean;
  redirect: boolean;
  redirect_url: string;
}

export interface SelectedItem {
  id: string;
  isDelete: boolean;
  isSelect: boolean;
}
