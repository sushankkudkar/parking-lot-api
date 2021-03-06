import {INTERNAL_SERVER_ERROR} from 'http-status'

/**
 * @extends Error
 */
class ExtendableError extends Error {
	constructor(message, status, isPublic) {
		super(message)
		this.name = this.constructor.name
		this.message = message
		this.status = status
		this.isPublic = isPublic
		this.isOperational = true
		Error.captureStackTrace(this, this.name)
	}
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export default class APIError extends ExtendableError {
	/**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
	constructor(message, status = INTERNAL_SERVER_ERROR, isPublic = false) {
		super(message, status, isPublic)
	}
}

