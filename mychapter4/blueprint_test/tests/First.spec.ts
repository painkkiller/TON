import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { First } from '../wrappers/First';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('First', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('First');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let first: SandboxContract<First>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        first = blockchain.openContract(First.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await first.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: first.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and first are ready to use
    });
});
