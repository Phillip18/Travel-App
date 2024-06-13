const { ContextExclusionPlugin } = require("webpack");
import { describe, expect, test } from '@jest/globals';
const { parseGeonamesInfo } = require('../src/server/server.js')
const { infoToSend } = require('../src/server/server.js')

describe('checks parseInfoGeonames', function () {
    test('checks parseInfoGeonames() when information when everything is fine',
        function () {
            parseGeonamesInfo({
                geonames: [
                    {
                        name: 'Kinshasa',
                        countryName: 'Congo',
                        distance: 10,
                        heat: 50
                    }
                ]
            })
            expect(infoToSend.name).toBe('Kinshasa')
            expect(infoToSend.country).toBe('Congo')
            expect(infoToSend.distance).toBe(10)
        }
    )
})