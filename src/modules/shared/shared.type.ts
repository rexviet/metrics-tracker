import { Document } from 'mongoose';

export interface IRepository {
  documentToObject(document: Document): any;
}