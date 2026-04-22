# Food Delivery App — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 22 April 2026  
**Currency:** INR (₹)  
**Payment:** Cash on Delivery (COD) only — No payment gateway integration  
**Chat:** Not in scope  

---

## Table of Contents

1. [Splash Screen](#1-splash-screen)
2. [Onboarding](#2-onboarding)
3. [Authentication — Sign Up](#3-authentication--sign-up)
4. [Authentication — Log In](#4-authentication--log-in)
5. [Authentication — Forgot Password & Verification](#5-authentication--forgot-password--verification)
6. [Location Access Permission](#6-location-access-permission)
7. [Dashboard (Home)](#7-dashboard-home)
8. [Search & Filters](#8-search--filters)
9. [Restaurant View](#9-restaurant-view)
10. [Product Details](#10-product-details)
11. [Cart](#11-cart)
12. [Order Confirmation / Success](#12-order-confirmation--success)
13. [Order Tracking](#13-order-tracking)
14. [My Orders (Order History)](#14-my-orders-order-history)
15. [Rating & Review](#15-rating--review)
16. [Profile](#16-profile)
17. [Address Management](#17-address-management)
18. [Favourites](#18-favourites)
19. [Notifications](#19-notifications)
20. [Settings](#20-settings)
21. [FAQs](#21-faqs)
22. [Non-Functional Requirements](#22-non-functional-requirements)
23. [Out of Scope (Phase 1)](#23-out-of-scope-phase-1)

---

## 1. Splash Screen

**Purpose:** Brand introduction while the app initializes.

### Functional Requirements

- Display the app logo ("Food" branding with the burger icon in the "O") centered on a white background.
- Two-phase animation:
  - **Phase 1:** Logo fades in.
  - **Phase 2:** Logo fully visible with subtle animation.
- Auto-navigate after 2–3 seconds:
  - **First-time user** → Onboarding screen.
  - **Returning authenticated user** → Dashboard.
- First-launch detection: store a flag locally (e.g., `isFirstLaunch` in AsyncStorage / SharedPreferences) to decide navigation target.
- Show a loading indicator if background initialization (auth token validation, config fetch) takes longer than the splash duration.

### UI Elements

- App logo (centered)
- White / light background
- No user interaction required

---

## 2. Onboarding

**Purpose:** Introduce the app's value propositions to first-time users.

### Functional Requirements

- A horizontally swipeable carousel with **3 slides**:

| Slide | Title | Illustration | Description |
|-------|-------|-------------|-------------|
| 1 | All your favorites | Person with food items | Get all your loved foods in one place, you just place the order we do the rest |
| 2 | Order from chosen chef | Chef illustration | Get all your loved foods in one place, you just place the order we do the rest |
| 3 | Free delivery offers | Delivery person on scooter | Get all your loved foods in one place, you just place the order we do the rest |

- **Dot indicators** at the bottom showing current slide position (orange for active, grey for inactive).
- **"NEXT" button** (orange, full-width) on slides 1 & 2 → advances to next slide.
- **"GET STARTED" button** (orange, full-width) on slide 3 → navigates to Login screen.
- **"Skip" text link** below the button on all slides → skips directly to Login screen.
- Onboarding should only show once per device (controlled by `isFirstLaunch` flag).

### UI Elements

- Full-screen illustration per slide
- Title text (bold, large)
- Description text (regular, smaller, grey)
- Pagination dots
- Primary CTA button (orange, rounded)
- Skip text link

---

## 3. Authentication — Sign Up

**Purpose:** Allow new users to create an account.

### Functional Requirements

**Input Fields:**

| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| Full Name | Text | Min 2 chars, max 50 | Yes |
| Email | Email | Valid email format, unique (server-validated) | Yes |
| Phone Number | Phone | 10-digit Indian mobile number, unique | Yes |
| Password | Password | Min 8 chars, 1 uppercase, 1 number, 1 special char | Yes |
| Re-type Password | Password | Must match Password field | Yes |

- **Show/Hide password** toggle (eye icon) for both password fields.
- **"SIGN UP" button** (orange, full-width) — submits the form.

**Validation:**
- Inline field-level validation on blur.
- Error messages displayed below each field in red.
- Disable Sign Up button until all fields are valid.
- Server-side: check for duplicate email/phone before creating account.

**Navigation:**
- On success → Location Access Permission screen.
- "Already have an account? **LOG IN**" link at the bottom → Login screen.
- Back arrow at top-left to go back.

### API

```
POST /api/auth/signup
Body: { name, email, phone, password }
Response: { userId, token, refreshToken }
```

---

## 4. Authentication — Log In

**Purpose:** Allow existing users to sign in.

### Functional Requirements

**Input Fields:**

| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| Email | Email | Valid email format | Yes |
| Password | Password | Show/hide toggle via eye icon | Yes |

- **"Remember me" checkbox** — persists email in local storage for auto-fill on next visit.
- **"Forgot Password" link** — navigates to Forgot Password flow.
- **"LOG IN" button** (orange, full-width) — submits credentials.

**Validation:**
- Inline validation on blur.
- Show "Invalid email or password" on authentication failure (do not reveal which field is wrong for security).
- Rate limit: lock account after 5 failed attempts for 15 minutes.

**Navigation:**
- On success → Dashboard (Home).
- "Don't have an account? **SIGN UP**" link → Sign Up screen.
- Back arrow at top-left (only if navigated from onboarding).

**Social Login (Phase 2 — Future Scope):**
- Facebook, Twitter, Apple buttons displayed in UI as per design.
- Show "Coming Soon" toast if tapped.

### API

```
POST /api/auth/login
Body: { email, password }
Response: { userId, token, refreshToken, user: { name, email, phone, avatar } }
```

---

## 5. Authentication — Forgot Password & Verification

**Purpose:** Allow users to reset their password via email OTP.

### 5.1 Forgot Password Screen

- **Input:** Email address (required, email format).
- **"SEND CODE" button** (orange, full-width) — triggers OTP to registered email.
- Validate email exists in system; show error if not found.
- On success → Verification screen.
- Back arrow to return to Login.

### 5.2 Verification Screen

- **Header:** "We have sent a code to your email [masked email]"
- **Input:** 4-digit OTP code in 4 separate input boxes (auto-focus next on entry).
- **Auto-submit** when all 4 digits are entered.
- **"Resend in 30sec"** countdown timer; "Resend" link becomes active after countdown.
- Max 3 resend attempts per session.
- OTP expires after 5 minutes server-side.
- **"VERIFY" button** (orange, full-width).
- On success → Reset Password screen.
- On failure → "Invalid code, please try again" and clear fields.

### 5.3 Reset Password Screen

- New Password + Confirm Password fields.
- Same password rules as Sign Up.
- On success → Login with success message.

### APIs

```
POST /api/auth/forgot-password
Body: { email }

POST /api/auth/verify-otp
Body: { email, otp }

POST /api/auth/reset-password
Body: { email, otp, newPassword }
```

---

## 6. Location Access Permission

**Purpose:** Request user's location to show nearby restaurants.

### Functional Requirements

- Show a map illustration with a location pin.
- **"ACCESS LOCATION" button** (orange, full-width) — triggers OS-level location permission dialog.
- Text: "DFOOD will access your location only while using the app."
- Info icon next to the heading for privacy details.

**Permission Handling:**

| Outcome | Action |
|---------|--------|
| Granted | Fetch coordinates, reverse-geocode to address, save as default delivery location, navigate to Dashboard |
| Denied | Navigate to Dashboard with manual address entry prompt; show "Enable location for better experience" banner |
| Denied Permanently | Show instructions to enable via device settings |

---

## 7. Dashboard (Home)

**Purpose:** Main landing screen showing restaurants, categories, and promotions.

### 7.1 Header

- **Delivery location bar** at top: "DELIVER TO" label (orange), location name (e.g., "Halal Lab office"), dropdown arrow to change address.
- Tapping delivery location opens Address Selection (list of saved addresses + "Add New Address").
- **Profile avatar** (top-right) — tapping navigates to Profile screen.
- **Notification bell icon** (top-left area, near location icon).

### 7.2 Greeting

- Dynamic greeting: "Hey [First Name], **Good [Morning/Afternoon/Evening]!**"

| Time Range | Greeting |
|-----------|----------|
| 5 AM – 12 PM | Good Morning |
| 12 PM – 5 PM | Good Afternoon |
| 5 PM – 9 PM | Good Evening |
| 9 PM – 5 AM | Good Night |

### 7.3 Search Bar

- Placeholder: "Search dishes, restaurants"
- Tapping navigates to dedicated Search Screen (Feature #8).
- Non-functional on Dashboard — acts as a navigation trigger only.

### 7.4 Categories Section

- **"All Categories"** heading with **"See All >"** link.
- Horizontal scrollable list of category chips/icons:
  - All (default selected, orange), Pizza, Burger, Hot Dog, Sandwich, etc.
- Each category shows: icon/image + name + starting price (e.g., "₹170").
- Selecting a category filters the restaurant list below OR navigates to a category-specific listing screen.
- "See All" opens full category grid view.

### 7.5 Open Restaurants Section

- **"Open Restaurants"** heading with **"See All >"** link.
- Vertical scrollable list of restaurant cards.

**Each restaurant card displays:**
- Restaurant cover image (landscape)
- Restaurant name (bold)
- Cuisine tags (e.g., "Burger · Chicken · Biriyani · Wings")
- Star rating (e.g., "4.7")
- Free delivery badge (truck icon + "Free")
- Estimated delivery time (clock icon + "20 min")

- Tapping a card → Restaurant View (Feature #9).
- **Pull-to-refresh** to reload data.

### 7.6 Promotional Popup/Banner (Optional)

- Overlay popup with offer details: "Hurry Offers!" with coupon code (e.g., "#1243CD2").
- Text: "Use the coupon get 25% discount."
- **"GOT IT" button** to dismiss.
- **Close (X) button** at top-right.
- Show once per session or based on server-driven campaign config.
- Orange background, bold text.

### APIs

```
GET /api/home
Response: { greeting, categories[], restaurants[], promotions[] }

GET /api/restaurants?category={id}&lat={}&lng={}&page={}&limit={}
```

---

## 8. Search & Filters

**Purpose:** Let users discover restaurants and dishes.

### 8.1 Search Screen

- **Search input** with auto-focus and keyboard open on entry.
- **Recent Keywords:** horizontal tag chips (e.g., "Burger", "Sandwich", "Pizza") — tappable to trigger search; clearable individually or "Clear All".
- **Suggested Restaurants:** vertical list with restaurant image, name, rating — based on user history / popularity.
- **Popular Fast Food:** horizontal scrollable cards with dish image, name, restaurant name.
- **Live search** with debounce (300ms) — searches both restaurants and dishes.
- Results grouped: "Restaurants" section + "Dishes" section.
- Empty state: "No results found for '[query]'" with illustration.
- Back arrow to return to Dashboard.

### 8.2 Category Listing Screen

- **Header:** Category name (e.g., "BURGER") with back arrow, search icon, filter icon.
- **Category dropdown** to switch category inline.
- **"Popular [Category]"** section: grid of 2 columns, each card showing dish image, name, restaurant name, price (₹).
- **"Open Restaurants"** section: restaurant cards (same format as Dashboard).
- **Add to cart button** (orange "+" circle) on each dish card for quick add.

### 8.3 Filter Bottom Sheet

Triggered by filter icon on category/restaurant listing.

| Filter | Type | Options |
|--------|------|---------|
| Offers | Toggle chips | Delivery, Pick Up, Offer |
| Payment | Info note | "COD available on all orders" |
| Delivery Time | Selectable chips | 10–15 min, 20 min, 30 min |
| Pricing | Selectable chips | ₹ (Budget), ₹₹ (Mid-range), ₹₹₹ (Premium) |
| Rating | Star selector | 1–5 stars (tap to select minimum) |

- **"FILTER" button** (orange, full-width) — applies filters and closes sheet.
- **Reset link** to clear all filters.

### APIs

```
GET /api/search?q={query}&type=restaurant|dish
GET /api/restaurants?category={id}&deliveryTime={}&priceRange={}&minRating={}&offers={}
```

---

## 9. Restaurant View

**Purpose:** Show restaurant details and its full menu.

### Functional Requirements

- **Header:** Back arrow, restaurant name, three-dot menu (Share, Report, Favourite).
- **Cover image:** full-width restaurant photo (parallax scroll effect optional).

**Restaurant Info:**
- Name (large, bold)
- Description text (grey, 2-line max with "Read more")
- Rating (star icon + "4.7"), Free delivery badge, Delivery time ("20 min")

- **Cuisine tags:** horizontal chips (e.g., "Burger", "Sandwich", "Pizza") — tappable to filter menu.
- **Menu section heading:** e.g., "Burger (10)" with item count.

**Each menu item displays:**
- Dish image (square thumbnail)
- Dish name
- Price in ₹
- **"+" button** (orange circle) to add to cart

- Tapping a menu item → Product Details (Feature #10).
- **Floating cart indicator** at bottom if items are in cart: "View Cart (3 items) — ₹XXX"

### APIs

```
GET /api/restaurants/{restaurantId}
GET /api/restaurants/{restaurantId}/menu?category={cuisineTag}
```

---

## 10. Product Details

**Purpose:** Show detailed information about a specific dish.

### Functional Requirements

- **Header:** Back arrow + "Details" title.
- **Image carousel:** horizontal swipeable dish images with left/right arrow navigation and dot indicators.
- **Restaurant name** (small, grey, with location icon).
- **Dish name** (large, bold).
- **Description** (grey text, multi-line).
- **Info badges row:** Rating (star + "4.7"), Free delivery (truck icon), Delivery time (clock + "20 min").

**SIZE Selector:**
- Horizontal selectable chips (e.g., 10", 14", 16").
- 14" selected by default (orange highlight).
- Sizes may affect price.

**INGREDIENTS Section:**
- Horizontal scrollable icons representing ingredients (visual only, no interaction).

**Price Display:**
- Large, bold, in ₹ (e.g., "₹32").
- Dynamic based on selected size.

**Quantity Selector:**
- "−" button | count | "+" button
- Min: 1, Max: 20

**"ADD TO CART" button** (orange, full-width):
- Adds item with selected size + quantity to cart.
- If item already in cart with same size → update quantity.
- If item already in cart with different size → add as separate line item.
- Show success toast: "Added to cart!"
- Button text changes to "UPDATE CART" if item already exists.

### APIs

```
GET /api/dishes/{dishId}
POST /api/cart/add — Body: { dishId, size, quantity, restaurantId }
```

---

## 11. Cart

**Purpose:** Review selected items, manage quantities, and place order.

### 11.1 Cart Items List

- **Header:** Back arrow + "Cart" title + "EDIT ITEMS" link (top-right).
- Each cart item shows:
  - Dish image (thumbnail)
  - Dish name
  - Price in ₹ (per unit)
  - Size (e.g., 14")
  - Quantity selector (−/+)
  - **Remove button** (red X icon) — removes item with confirmation
- Updating quantity recalculates totals in real-time.
- **"DONE" button** in edit mode to confirm changes.

### 11.2 Delivery Address

- **"DELIVERY ADDRESS"** section with **"EDIT"** link.
- Shows current selected address (e.g., "2118 Thornridge Cir, Syracuse").
- Tapping "EDIT" opens Address Selection screen.

### 11.3 Order Summary

- **TOTAL:** displayed prominently in ₹.
- **"Breakdown >"** link to expand detailed breakdown:
  - Item subtotal
  - Delivery fee (or "Free" if applicable)
  - Taxes & charges
  - Discount (if coupon applied)
  - **Grand Total**

### 11.4 Coupon / Promo Code (Optional)

- "Apply Coupon" input field with "Apply" button.
- Show applied coupon with discount amount and remove option.

### 11.5 Place Order

- **"PLACE ORDER" button** (orange, full-width).
- **Payment method shown:** "Cash on Delivery (COD)" — no selection needed, auto-selected.
- On tap: validate cart (items still available, restaurant still open, address selected).
- Show confirmation dialog: "Confirm your order of ₹XXX? Payment: Cash on Delivery"
- On confirm → Order Success screen.

### 11.6 Empty Cart State

- Illustration with text: "Your cart is empty"
- "Browse Restaurants" button → Dashboard.

### 11.7 Multi-Restaurant Restriction

- Cart should only contain items from **one restaurant** at a time.
- If user adds item from a different restaurant, show dialog:
  - "Your cart has items from [Restaurant A]. Do you want to clear the cart and add items from [Restaurant B]?"
  - Options: **"Clear Cart"** / **"Cancel"**

### APIs

```
GET /api/cart
PUT /api/cart/update — Body: { items: [{ dishId, size, quantity }] }
DELETE /api/cart/item/{itemId}
POST /api/orders — Body: { cartId, addressId, paymentMethod: "COD", couponCode? }
```

---

## 12. Order Confirmation / Success

**Purpose:** Confirm that the order has been placed successfully.

### Functional Requirements

- **Illustration:** Celebration / confetti graphic.
- **Title:** "Congratulations!"
- **Message:** "You successfully placed your order, enjoy your meal!"
- **"TRACK ORDER" button** (orange, full-width) → Order Tracking screen.
- Auto-navigate to Order Tracking after 5 seconds if no interaction.
- **No back navigation** — user cannot go back to cart after order is placed.

---

## 13. Order Tracking

**Purpose:** Show current status of an active order.

### Functional Requirements

**Order Status Stepper (vertical):**

| Step | Status | Description |
|------|--------|-------------|
| 1 | Order Placed | Your order has been placed successfully |
| 2 | Restaurant Confirmed | The restaurant has accepted your order |
| 3 | Preparing Food | Your food is being prepared |
| 4 | Out for Delivery | Your order is on its way |
| 5 | Delivered | Your order has been delivered |

- Each step shows: icon, title, timestamp, and completion state (✓ completed / spinner in-progress / grey upcoming).
- Current active step is highlighted with orange color and animated indicator.
- Completed steps show green checkmarks with timestamps.

**Estimated Delivery Time:**
- Prominently displayed at the top (e.g., "Estimated delivery: 25 min").
- Updates dynamically based on order progress.

**Order Details Card:**
- Order number (e.g., "#162432")
- Restaurant name and image
- Order date/time (e.g., "08 Sept, 12:00 PM")
- Items summary (e.g., "2x Burger, 4x Sandwich")
- Total amount in ₹

**Cancel Order:**
- **"Cancel Order"** button available only if order status is **"Order Placed"** or **"Restaurant Confirmed"** (before preparation starts).
- Cancel confirmation dialog: "Are you sure you want to cancel?" → **Yes** / **No**
- After cancellation: show "Order Cancelled" status, navigate to My Orders.

**Status Polling:**
- Poll for status updates every 30 seconds.
- Push notification triggered on each status change.

### APIs

```
GET /api/orders/{orderId}/track
Response: { orderId, status, steps[], estimatedDelivery, restaurant, items[], total }

PUT /api/orders/{orderId}/cancel
```

---

## 14. My Orders (Order History)

**Purpose:** View ongoing and past orders.

### 14.1 Tab Navigation

- **"Ongoing" tab** (default selected).
- **"History" tab**.
- Three-dot menu icon (top-right) — options: "Sort by Date", "Filter by Status".

### 14.2 Ongoing Orders

- Grouped by category (Food, Drink) with section headers.

**Each order card shows:**
- Restaurant image (thumbnail)
- Restaurant name
- Price in ₹ (e.g., "₹35.25")
- Item count (e.g., "03 Items")
- Order number (e.g., "#162432")
- **"Track Order" button** (orange, outlined) → Order Tracking
- **"Cancel" button** (orange, outlined) → cancels order (with confirmation)

- Empty state: "No ongoing orders" with illustration.

### 14.3 Order History

- Same card layout as Ongoing, plus:
  - **Status badge:** "Completed" (green) or "Cancelled" (red)
  - Order date & time (e.g., "30 JAN, 12:30")
  - **"Rate" button** (orange, outlined) → opens rating flow for completed orders
  - **"Re-Order" button** (orange, filled) → adds same items to cart → Cart screen
- Pagination: infinite scroll, 10 orders per page.
- Empty state: "No order history yet" with illustration.

### APIs

```
GET /api/orders?status=ongoing&page={}&limit={}
GET /api/orders?status=history&page={}&limit={}
POST /api/orders/{orderId}/reorder
```

---

## 15. Rating & Review

**Purpose:** Allow users to rate completed orders.

### Functional Requirements

- Triggered from **"Rate"** button on completed orders.
- **Star rating:** 1–5 stars (tap to select).
- **Text review** (optional, max 500 characters).
- **"Submit" button**.
- Rating is for the restaurant (not individual items).
- User can only rate once per order; "Rate" button changes to "Rated ★4.5" after submission.
- Average rating updates on restaurant profile.

### APIs

```
POST /api/orders/{orderId}/review — Body: { rating, reviewText? }
GET /api/restaurants/{restaurantId}/reviews?page={}&limit={}
```

---

## 16. Profile

**Purpose:** Central hub for user account management and app settings.

### 16.1 Profile Screen

- **User avatar** (circular, with camera icon overlay for edit).
- **User name** (bold) and **bio/tagline** (grey).

**Menu List:**

| Icon | Label | Action |
|------|-------|--------|
| 👤 | Personal Info | → Personal Info screen |
| 📍 | Addresses | → My Address screen |
| 🛒 | Cart | → Cart screen |
| ❤️ | Favourite | → Favourites screen |
| 🔔 | Notifications | → Notifications screen |
| 💳 | Payment Method | → "Only COD available" info screen |
| ❓ | FAQs | → FAQs screen |
| ⭐ | User Reviews | → User's submitted reviews list |
| ⚙️ | Settings | → Settings screen |
| 🚪 | Log Out | → Logout confirmation dialog |

### 16.2 Personal Info (View)

- **Header:** Back arrow + "Personal Info" + "EDIT" link (orange, top-right).
- Displays (read-only):
  - Avatar (large, circular)
  - Name + bio below avatar
  - Full Name (with icon)
  - Email (with icon)
  - Phone Number (with icon)
- Tap "EDIT" to switch to Edit mode.

### 16.3 Edit Profile

- **Header:** Back arrow + "Edit Profile".
- **Avatar** with pencil/camera overlay icon — tap to choose photo from gallery or take new photo.

**Editable Fields:**

| Field | Type | Notes |
|-------|------|-------|
| Full Name | Text input | Same validation as Sign Up |
| Email | Email input | May require re-verification if changed |
| Phone Number | Phone input | May require OTP verification if changed |
| Bio | Textarea | Max 150 characters |

- **"SAVE" button** (orange, full-width).
- Show success toast on save.

### APIs

```
GET /api/user/profile
PUT /api/user/profile — Body: { name, email, phone, bio, avatar? }
POST /api/user/avatar — multipart form data for image upload
```

---

## 17. Address Management

**Purpose:** Manage delivery addresses.

### 17.1 My Address Screen

- **Header:** Back arrow + "My Address".
- List of saved addresses, each showing:
  - **Label icon** (Home / Work / Other)
  - **Label name** (bold, e.g., "HOME", "WORK")
  - **Full address** text (2 lines max)
  - **Edit icon** (pencil) → Edit Address
  - **Delete icon** (trash) → confirmation dialog → deletes address
- **"ADD NEW ADDRESS" button** (orange, full-width) at bottom.
- Maximum **5 saved addresses**.

### 17.2 Add / Edit Address Screen

**Address Form:**

| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| Address | Text (auto-filled from location) | Editable | Yes |
| Street | Text input | — | Yes |
| Post Code | Numeric input | 6-digit Indian PIN code | Yes |
| Apartment | Text input | — | No |
| Label As | Selectable chips | Home / Work / Other (single select) | Yes |

- **"SAVE LOCATION" button** (orange, full-width).

### APIs

```
GET /api/user/addresses
POST /api/user/addresses — Body: { label, address, street, postCode, apartment?, lat, lng }
PUT /api/user/addresses/{addressId}
DELETE /api/user/addresses/{addressId}
```

---

## 18. Favourites

**Purpose:** Save and access favourite restaurants.

### Functional Requirements

- List of favourited restaurants (same card format as Dashboard restaurant cards).
- **Unfavourite:** swipe-left to reveal "Remove" or tap heart icon to toggle.
- Empty state: "No favourites yet. Explore restaurants!" with "Browse" button.
- Favourite toggle available on: Restaurant View screen, Dashboard restaurant cards.
- Favourite state persisted server-side (synced across devices).

### APIs

```
GET /api/user/favourites
POST /api/user/favourites/{restaurantId}
DELETE /api/user/favourites/{restaurantId}
```

---

## 19. Notifications

**Purpose:** Keep users informed about order updates and offers.

### Functional Requirements

- **Notification list** with timestamp grouping (Today, Yesterday, Earlier).
- Each notification shows: icon, title, message, timestamp, read/unread indicator.

**Notification Types:**

| Type | Trigger |
|------|---------|
| Order Status | Placed, confirmed, preparing, out for delivery, delivered, cancelled |
| Promotional | Offers, discounts (if enabled by user) |
| System | App updates, announcements |

- Tap notification → deep-link to relevant screen (e.g., order tracking).
- **"Mark all as read"** option.
- Push notification permission requested after first successful order.
- **Unread badge count** on notification bell icon (Dashboard) and Profile menu item.

### APIs

```
GET /api/notifications?page={}&limit={}
PUT /api/notifications/{id}/read
PUT /api/notifications/read-all
POST /api/devices/register — Body: { deviceToken, platform }
```

---

## 20. Settings

**Purpose:** App preferences and configuration.

### Functional Requirements

| Setting | Type | Details |
|---------|------|---------|
| Notification Preferences | Toggles | Order updates (on/off), Promotional offers (on/off) |
| Language | Selector | English (default); Hindi, etc. as future scope |
| App Version | Display | Read-only version number |
| Terms & Conditions | Link | Opens webview / browser |
| Privacy Policy | Link | Opens webview / browser |
| Delete Account | Action | Confirmation flow with password re-entry → permanently deletes account and data |

### APIs

```
GET /api/user/settings
PUT /api/user/settings — Body: { notificationPrefs, language }
DELETE /api/user/account
```

---

## 21. FAQs

**Purpose:** Self-service help for common questions.

### Functional Requirements

- Expandable accordion list of FAQ items.
- Each item: Question (bold, tappable) → expands to show Answer.
- **Categories:** Orders, Delivery, Payment, Account, General.
- Content managed from backend (CMS-driven).
- Search bar at top to filter FAQs.

### API

```
GET /api/faqs?category={}&q={}
```

---

## 22. Non-Functional Requirements

### Authentication & Security

| Requirement | Details |
|------------|---------|
| Token Strategy | JWT — access token (15 min expiry) + refresh token (30 day expiry) |
| Transport | All API calls over HTTPS |
| Password Storage | Hashed with bcrypt (min cost factor 10) |
| Input Sanitization | All form fields sanitized to prevent XSS / SQL injection |
| Session Timeout | 30 minutes of inactivity |

### Performance

| Requirement | Target |
|------------|--------|
| App Cold Start | < 3 seconds |
| API Response Time | < 500ms for all endpoints |
| Image Loading | Lazy loading with placeholder / skeleton screens |
| Pagination | Default 10 items per page on all list endpoints |
| Client-side Cache | Categories, restaurant list — 5-minute TTL |

### UI/UX Standards

| Aspect | Standard |
|--------|----------|
| Primary Color | Orange (#FF6B35 or as per design system) |
| Auth Screens Theme | Dark background |
| All Other Screens | Light background |
| Loading States | Skeleton loaders on all data-fetching screens |
| Refresh | Pull-to-refresh on all list screens |
| Feedback | Toast notifications for success/error |
| Navigation | Bottom navigation bar: Home, Search, Orders, Profile |

### Offline Handling

- Show cached data when offline with "You're offline" banner.
- Queue actions (add to cart, favourite) and sync when back online.
- Disable order placement when offline.

### Accessibility

| Requirement | Target |
|------------|--------|
| Touch Target | Minimum 44×44 points |
| Text Scaling | Scalable up to 200% |
| Screen Reader | Support for all interactive elements |
| Color Contrast | WCAG AA compliant |

---

## 23. Out of Scope (Phase 1)

The following features are **not included** in the Phase 1 release:

- Payment gateway integration (Razorpay, Paytm, UPI, etc.) — COD only
- In-app chat / messaging with delivery partner or restaurant
- Social login (Google, Facebook, Apple) — UI present but non-functional
- Multi-language support
- Restaurant owner / admin panel
- Delivery partner app
- Real-time GPS tracking of delivery partner on map
- Scheduled / pre-orders
- Table reservation
- Referral / loyalty program

---

*End of Document*
