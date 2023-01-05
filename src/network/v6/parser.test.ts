import { eParseMode } from "../enum.js";
import { parseIP } from "./parser.js";
import { BITS } from "./util.js";

export { test };

async function test(): Promise<string[]> {
    const errors: string[] = [];

    {
        const msgPrefix = "prefixNum2Bits";

        function equalData(a: { address: bigint, mask: bigint }, b: { address: bigint, mask: bigint }) {
            return a.address === b.address && a.mask === b.mask;
        }

        for (const data of <{ input: { str: string, mode: eParseMode }, expect: { address: bigint, mask: bigint } }[]>[
            { input: { str: null, mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::", mode: null }, expect: { address: undefined, mask: undefined } },
            { input: { str: undefined, mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::", mode: undefined }, expect: { address: undefined, mask: undefined } },



            { input: { str: "a:::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::", mode: eParseMode.host }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },



            { input: { str: "a:::/", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::/", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::/", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::/", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a:::/a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::/a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::/a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::/a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a:::/0", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/0", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/0", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/0", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/0", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::/0", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/0", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/0", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/0", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/0", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::/0", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/0", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/0", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/0", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/0", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::/0", mode: eParseMode.auto }, expect: { address: 0n, mask: 0n } },
            { input: { str: "::/0", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/0", mode: eParseMode.prefix }, expect: { address: 0n, mask: 0n } },
            { input: { str: "::/0", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/0", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/0", mode: eParseMode.auto }, expect: { address: BITS, mask: 0n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/0", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/0", mode: eParseMode.prefix }, expect: { address: BITS, mask: 0n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/0", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/0", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a:::/128", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/128", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/128", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/128", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/128", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::/128", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/128", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/128", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/128", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/128", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::/128", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/128", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/128", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/128", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/128", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::/128", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::/128", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/128", mode: eParseMode.prefix }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::/128", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/128", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/128", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/128", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/128", mode: eParseMode.prefix }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/128", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/128", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a:::/129", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/129", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/129", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/129", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::/129", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::/129", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/129", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/129", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/129", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::/129", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::/129", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/129", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/129", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/129", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::/129", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::/129", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/129", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/129", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/129", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::/129", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/129", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/129", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/129", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/129", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/129", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },



            { input: { str: "a::: ", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: ", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: ", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: ", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: ":: ", mode: eParseMode.host }, expect: { address: 0n, mask: BITS } },
            { input: { str: ":: ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ", mode: eParseMode.host }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: " a:::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: " a:::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: " a:::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: " a:::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: " a:::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: " z:::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: " z:::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: " z:::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: " z:::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: " z:::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: " :::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: " :::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: " :::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: " :::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: " :::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: " ::", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: " ::", mode: eParseMode.host }, expect: { address: 0n, mask: BITS } },
            { input: { str: " ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: " ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: " ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: " ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: " ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: BITS, mask: BITS } },
            { input: { str: " ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: " ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: " ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a::: a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a::: ::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: ::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: ::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: ::", mode: eParseMode.auto }, expect: { address: 0n, mask: 0n } },
            { input: { str: ":: ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ::", mode: eParseMode.subnetMask }, expect: { address: 0n, mask: 0n } },
            { input: { str: ":: ::", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: BITS } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::", mode: eParseMode.auto }, expect: { address: BITS, mask: 0n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::", mode: eParseMode.subnetMask }, expect: { address: BITS, mask: 0n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: BITS } },


            { input: { str: "a::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: ":: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: 0n, mask: BITS } },
            { input: { str: ":: ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: 0n } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: 0n } },


            { input: { str: "a::: ::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: ::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: ::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: ::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: ::1", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS - 1n } },
            { input: { str: ":: ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ::1", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: BITS - 1n } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::1", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS - 1n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ::1", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: BITS - 1n } },


            { input: { str: "a::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: 0n, mask: 170141183460469231731687303715884105728n } },
            { input: { str: ":: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: 170141183460469231731687303715884105728n } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: BITS, mask: 170141183460469231731687303715884105728n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: 170141183460469231731687303715884105728n } },


            { input: { str: "a::: 8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: 8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: 8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: 8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: 8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: 8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: 8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: 8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: 8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: 8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff 8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z::: 7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z::: 7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":: ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },



            { input: { str: "a:::    ", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    ", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    ", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    ", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::    ", mode: eParseMode.host }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::    ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ", mode: eParseMode.host }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "    a:::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    a:::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    a:::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    a:::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    a:::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "    z:::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    z:::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    z:::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    z:::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    z:::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "    :::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    :::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    :::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    :::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    :::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "    ::", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: "    ::", mode: eParseMode.host }, expect: { address: 0n, mask: BITS } },
            { input: { str: "    ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: "    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: BITS, mask: BITS } },
            { input: { str: "    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a:::    a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    a", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    a", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    a", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    a", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    a", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a:::    ::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    ::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    ::", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    ::", mode: eParseMode.auto }, expect: { address: 0n, mask: 0n } },
            { input: { str: "::    ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ::", mode: eParseMode.subnetMask }, expect: { address: 0n, mask: 0n } },
            { input: { str: "::    ::", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: BITS } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::", mode: eParseMode.auto }, expect: { address: BITS, mask: 0n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::", mode: eParseMode.subnetMask }, expect: { address: BITS, mask: 0n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: BITS } },


            { input: { str: "a:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: 0n, mask: BITS } },
            { input: { str: "::    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: 0n } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: BITS, mask: BITS } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: 0n } },


            { input: { str: "a:::    ::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    ::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    ::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    ::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    ::1", mode: eParseMode.auto }, expect: { address: 0n, mask: BITS - 1n } },
            { input: { str: "::    ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ::1", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: BITS - 1n } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::1", mode: eParseMode.auto }, expect: { address: BITS, mask: BITS - 1n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ::1", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: BITS - 1n } },


            { input: { str: "a:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: 0n, mask: 170141183460469231731687303715884105728n } },
            { input: { str: "::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: 0n, mask: 170141183460469231731687303715884105728n } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: BITS, mask: 170141183460469231731687303715884105728n } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    7fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: BITS, mask: 170141183460469231731687303715884105728n } },


            { input: { str: "a:::    8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    8::1", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    8::1", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    8::1", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    8::1", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    8::1", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },


            { input: { str: "a:::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "a:::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "z:::    7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "z:::    7fff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: ":::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: ":::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "::    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },

            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.auto }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.host }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.prefix }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.subnetMask }, expect: { address: undefined, mask: undefined } },
            { input: { str: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff    ffff:ffff:ffff::ffff:ffff:ffff:ffff", mode: eParseMode.wildcardBit }, expect: { address: undefined, mask: undefined } },
        ]) {
            const check = parseIP(data.input?.str, data.input?.mode);
            if (!equalData(check, data.expect)) {
                const msg = msgPrefix + " => 失敗っぽい「" + data.input.str + ", " + data.input.mode + "」が「" + data.expect.address + ", " + data.expect.mask + "」じゃなく「" + check.address + ", " + check.mask + "」になっている";
                errors.push(msg);
            }
        }
    }

    return errors;
}
