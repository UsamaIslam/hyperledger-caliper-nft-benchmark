'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MintWithTokenURI extends WorkloadModuleBase {
    
    index;

    constructor() {
        super();
        this.index = 0;
    }

    // async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
    //     await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

    //     // for (let i=0; i<this.roundArguments.tokens; i++) {
    //     //     const tokenID = `${this.workerIndex}_${i}`;
    //     //     console.log(`Worker ${this.workerIndex}: Creating token ${tokenID}`);
    //     //     const request = {
    //     //         contractId: this.roundArguments.contractId,
    //     //         contractFunction: 'Createtoken',
    //     //         invokerIdentity: 'User1',
    //     //         contractArguments: [tokenID,'blue','20','penguin','500'],
    //     //         readOnly: false
    //     //     };

    //     //     await this.sutAdapter.sendRequests(request);
    //     // }
    // }

    async submitTransaction() {
        
        const tokenID = `${this.workerIndex}_${this.index++}`;
        console.log(`Worker ${this.workerIndex}: Creating token ${tokenID}`);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'MintWithTokenURI',
            invokerIdentity: this.roundArguments.invokerId,
            contractArguments: [tokenID, 'https://example.com/nft101.json'],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(myArgs);
        
    }

    // async cleanupWorkloadModule() {
    //     // for (let i=0; i<this.index; i++) {
    //     //     const tokenID = `${this.workerIndex}_${i}`;
    //     //     console.log(`Worker ${this.workerIndex}: Burning token ${tokenID}`);
    //     //     const request = {
    //     //         contractId: this.roundArguments.contractId,
    //     //         contractFunction: 'Burn',
    //     //         invokerIdentity: this.roundArguments.invokerId,
    //     //         contractArguments: [tokenID],
    //     //         readOnly: false
    //     //     };

    //     //     await this.sutAdapter.sendRequests(request);
    //     // }
    // }
}

function createWorkloadModule() {
    return new MintWithTokenURI();
}

module.exports.createWorkloadModule = createWorkloadModule;
