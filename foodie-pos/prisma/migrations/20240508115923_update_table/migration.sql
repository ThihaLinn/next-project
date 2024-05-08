/*
  Warnings:

  - A unique constraint covering the columns `[itemId]` on the table `OrderCartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderCartItem_itemId_key" ON "OrderCartItem"("itemId");
