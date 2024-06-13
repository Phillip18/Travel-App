import { describe, expect, test } from '@jest/globals';
import { coordinatesOutOfRange, placeNotFound, empty, writeErrorText, negativeTime, invalidDate } from '../src/client/js/listener.js';

describe ('tests writeErrorText() in listener.js', function() {
    test ('tests writeErrorText', function() {
        expect(writeErrorText(placeNotFound)).toBe('Place not listed.  It is probably somewhere in the ocean.')
        expect(writeErrorText(coordinatesOutOfRange)).toBe('Coordinate(s) out of range')
        expect(writeErrorText(empty)).toBe('Please enter both latitude and longitude')
        expect(writeErrorText(negativeTime)).toBe('Arrival date can\'t be in the past')
        expect(writeErrorText(invalidDate)).toBe('Invalid Date')
    })
})