

# LabFinal

## Project Overview

**LabFinal** is a web application for managing tourist attractions, visitors, and reviews. It allows users to view attractions, register as visitors, and leave reviews for attractions they have visited. The application ensures proper validation, such as ensuring that visitors cannot review the same attraction twice and ensuring valid email formats for visitors.

## Features

- **Attractions**: Users can add, update, and view attractions with details like name, location, entry fee, and ratings.
- **Visitors**: Visitors can register with unique emails, and they can leave reviews for attractions they have visited.
- **Reviews**: Visitors can rate and review attractions. A visitor can leave only one review per attraction.
- **Top Rated Attractions**: Get the top 5 attractions based on their ratings.
- **Visitor Activity**: Track the activity of visitors, including the count of attractions they have visited.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **API Documentation**: Postman collections for API testing
- **Authentication**: No authentication (open API)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps to Set Up

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Zubairad/labFinal.git
```

2. Navigate to the project directory:

```bash
cd labFinal
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Set up MongoDB locally or configure it to use a cloud MongoDB service (such as MongoDB Atlas).

5. Start the server:

```bash
npm start
```

By default, the server will run on `http://localhost:3000`.

## API Endpoints

### 1. **Attractions**
- **GET /api/attractions**: Fetch all attractions
- **POST /api/attractions**: Add a new attraction
- **PATCH /api/attractions/:id**: Update an attraction

### 2. **Visitors**
- **GET /api/visitors**: Fetch all visitors
- **POST /api/visitors**: Register a new visitor

### 3. **Reviews**
- **POST /api/reviews**: Post a new review for an attraction

### 4. **Additional Endpoints**
- **GET /api/attractions/topRated**: Fetch the top 5 attractions by ratings
- **GET /api/visitors/activity**: Fetch visitors with the count of attractions they have visited

## Validation Rules

- **Visitor Email**: Must be unique and valid.
- **Entry Fee**: Cannot be negative.
- **Review**: A visitor can only review an attraction once.

## Example Usage

**Add a New Attraction**

POST request to `/api/attractions` with the following JSON body:

```json
{
  "name": "Eiffel Tower",
  "location": "Paris, France",
  "entryFee": 25,
  "rating": 4.5
}
```

**Register a New Visitor**

POST request to `/api/visitors` with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Post a Review**

POST request to `/api/reviews` with the following JSON body:

```json
{
  "visitor": "visitorId",
  "attraction": "attractionId",
  "score": 5,
  "comment": "Amazing experience!"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

You can adjust the sections according to your needs, but this should give you a good starting point.
