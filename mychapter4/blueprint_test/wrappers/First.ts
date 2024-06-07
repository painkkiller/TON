import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type FirstConfig = {};

export function firstConfigToCell(config: FirstConfig): Cell {
    return beginCell().endCell();
}

export class First implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new First(address);
    }

    static createFromConfig(config: FirstConfig, code: Cell, workchain = 0) {
        const data = firstConfigToCell(config);
        const init = { code, data };
        return new First(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
