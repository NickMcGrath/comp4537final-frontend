class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthorizationError";
    }
}

class UserExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServerError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

export default {ValidationError, AuthenticationError, AuthorizationError, UserExistsError, ServerError, NotFoundError}