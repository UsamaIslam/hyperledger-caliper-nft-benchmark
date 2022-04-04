'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class ClientAccountBalance extends WorkloadModuleBase {
    
    constructor() {
        super();
    }

    async submitTransaction() {

        console.log(`Worker ${this.workerIndex}: reading client account balance for ${this.roundArguments.invokerId}`);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'ClientAccountBalance',
            invokerIdentity: this.roundArguments.invokerId,
            contractArguments: [],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(myArgs);
        
    }
}

function createWorkloadModule() {
    return new ClientAccountBalance();
}

module.exports.createWorkloadModule = createWorkloadModule;
