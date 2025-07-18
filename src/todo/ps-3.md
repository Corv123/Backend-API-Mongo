# Milestone 3: Set Up Product Model, Product DTO, Constraints & Associations

## 3a. Set Up Product and Merchant Model

**TODO 1. Create Product Model**

Create `product.ts` file in `models` folder.

<u>File: product.ts</u>

- Import `Table`, `Column`, `Model`, `DataType`, `ForeignKey`, `BelongsTo`, `AllowNull` from `sequelize-typescript`.
- Import `Merchant` from `./merchant`.

```typescript
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Merchant } from './merchant';
```

Use the `@Table` decorator to define the table name and other table options like `timestamps`.

```typescript
@Table({
    tableName: 'entity_product',
    timestamps: true,
})
```

Define a class `Product` that extends `Model`. 

```typescript
export class Product extends Model {
    // Define columns here
}
```

Define `product_id`, `merchant_id`, and `product_name` columns.
- **Primary Key Column**:<br>
Use the `@Column` decorator with `primaryKey: true` to define the primary key column with auto-increment.

- **Foreign Key Column**:<br>
Use the `@ForeignKey` decorator above the `@Column` to be assigned as foreign key to the parent table.


- **String Column**:<br>
Use the `@Column` decorator with `type: DataType.STRING` to define a string column.

- **Child Table**:<br>
Use the `@BelongsTo` decorator and assign to the parent table.

```typescript
@Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
})
product_id!: number;

@ForeignKey(() => Merchant)
@Column({
    type: DataType.INTEGER,
    allowNull: false,
})
merchant_id!: number;

@Column({
    type: DataType.STRING,
    allowNull: false,
})
product_name!: string;


@BelongsTo(() => Merchant)
merchant!: Merchant;
```

Use `export default Product` to export the model class.

```typescript
export default Product
```
<br><br>

**TODO 2. Modify Merchant Model**

<u>File: merchant.ts</u>

- Import `HasMany` from `sequelize-typescript`.
- Import `Product` from `./product`.

```typescript
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Product from './product';
```

Update `@Table` to join `Merchant` to `Product` with `@HasMany` decorator and assign to the child table after the `merchant_name` column.

```typescript
@HasMany(() => Product)
products!: Product[];
```
<br><br>

## 3b. Set Up Product DTO

**TODO 3. Create Product Request and Response DTO**

Create `product_dto.ts` file in `dtos` folder.

<u>File: product_dto.ts</u>

Use the `export interface` syntax to define the `ProductReqDTO` interface.

```typescript
export interface ProductReqDTO {
    // Complete variables
}
```
Add the variable(s) below into the `ProductReqDTO`.

**merchant_id**: A number representing the id of the merchant.<br>
**product_name**: A string representing the name of the product.

```typescript
merchant_id: number;
product_name: string;
```
<br>

Use the `export interface` syntax to define the `ProductResDTO` interface.

```typescript
export interface ProductResDTO {
    // Complete variables
}
```

Add the variable(s) below into the `ProductResDTO`.

**merchant_id**: A number representing the id of the merchant.<br>
**merchant_name**: A string representing the name of the merchant.<br>
**product_id**: A number representing the id of the product.<br>
**product_name**: A string representing the name of the product.

```typescript
merchant_id: number;
merchant_name: string;
product_id: number;
product_name: string;
```