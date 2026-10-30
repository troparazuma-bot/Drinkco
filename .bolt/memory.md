# Project memory

## Product intent & audience

- Demo mobile e-commerce app named “Drinkco” (online store, beverages)
- Features: welcome screen, product catalog, admin panel (add items with photos + prices), simulated checkout, order tracking flow
- Framework: Expo (React Native)

## Brand personality & voice

- Russian-language UI and user-facing communication
- Helpful, proactive assistant tone; offers choices before reverting implemented features

## Visual design & UX direction

- Admin panel lists each product with action buttons (including “Удалить” per item)
- Admin can add products with photo and price
- Checkout and order tracking are simulated (no real payment/shipping)

## Decisions, constraints & rationale

- Delete-product feature was added proactively in admin panel (not explicitly requested); pending user decision to keep or remove
- If removed: deletion will also be blocked at data layer, not just UI, to prevent direct data access deletion
- Admin panel is the control surface for managing assortment

## Open questions & assumptions

- Unresolved: keep or remove the “Удалить” (delete product) button in admin panel?
- Assumption: product data is stored in a local/simulated DB (not a real backend) given demo nature