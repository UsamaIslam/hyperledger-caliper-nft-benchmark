'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class TransferFrom extends WorkloadModuleBase {
    
    index;

    constructor() {
        super();
        this.index = 0;
    }

    async submitTransaction() {
        
        const tokenID = `${this.workerIndex}_${this.index++}`;
        console.log(`Worker ${this.workerIndex}: Transferring token ${tokenID}`);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'TransferFrom',
            invokerIdentity: this.roundArguments.invokerId,
            contractArguments: [this.roundArguments.minterClientID, this.roundArguments.recipientClientID, tokenID],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(myArgs);
        
    }

}

function createWorkloadModule() {
    return new TransferFrom();
}

module.exports.createWorkloadModule = createWorkloadModule;
