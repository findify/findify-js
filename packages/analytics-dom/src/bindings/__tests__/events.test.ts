import { getEventsOnPage } from '../events';

describe('Events', () => {
  it('Should find "update-cart" event', () => {
    document.body.innerHTML = `
      <div data-findify-event="update-cart">
        <div data-findify-item-id="PRODUCT_ID_1" data-findify-variant-item-id="VARIANT_ID_1" data-findify-unit-price="1" data-findify-quantity="1" />
        <div data-findify-item-id="PRODUCT_ID_2" data-findify-variant-item-id="VARIANT_ID_2" data-findify-unit-price="2" data-findify-quantity="2" />
      </div>
    `
    const founded = getEventsOnPage(document);
    expect(founded).toEqual(
      {
        "update-cart": {
          "item_id": "PRODUCT_ID_1",
          "quantity": "1",
          "unit_price": "1",
          "variant_item_id": "VARIANT_ID_1"
        }
      }
    );
  })

  it('Should find "view-page" event', () => {
    document.body.innerHTML = `
      <div data-findify-event="view-page" data-findify-item-id="PRODUCT_ID" data-findify-variant-item-id="PRODUCT_VARIANT_ID"></div>
    `
    const founded = getEventsOnPage(document);
    expect(founded).toEqual(
      {
        "view-page": {
          "item_id": "PRODUCT_ID",
          "variant_item_id": "PRODUCT_VARIANT_ID"
        }
      }
    )
  })

  it('Should find "purchase" event', () => {
    document.body.innerHTML = `
      <div data-findify-event="purchase" data-findify-order-id="ORDER_ID" data-findify-currency="EUR" data-findify-revenue="288">
        <div data-findify-item-id="PRODUCT_ID_1" data-findify-variant-item-id="VARIANT_ID_1" data-findify-unit-price="269" data-findify-quantity="1"></div>
        <div data-findify-item-id="PRODUCT_ID_2" data-findify-variant-item-id="VARIANT_ID_2" data-findify-unit-price="19" data-findify-quantity="1"></div>
      </div>
    `
    const founded = getEventsOnPage(document);
    expect(founded).toEqual(
      {
        "purchase": {
          "currency": "EUR",
          "line_items": [
            {"item_id": "PRODUCT_ID_1", "quantity": "1", "unit_price": "269", "variant_item_id": "VARIANT_ID_1"},
            {"item_id": "PRODUCT_ID_2", "quantity": "1", "unit_price": "19", "variant_item_id": "VARIANT_ID_2"}
          ],
          "order_id": "ORDER_ID",
          "revenue": "288"
        }
      }
    )
  })
})
