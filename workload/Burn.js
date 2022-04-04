'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class Burn extends WorkloadModuleBase {
    
    index;

    constructor() {
        super();
        this.index = 0;
    }

    async submitTransaction() {
        
        const tokenID = `${this.workerIndex}_${this.index++}`;
        console.log(`Worker ${this.workerIndex}: Burning token ${tokenID}`);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'Burn',
            invokerIdentity: this.roundArguments.invokerId,
            contractArguments: [tokenID],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(myArgs);
        
    }

}

function createWorkloadModule() {
    return new Burn();
}

module.exports.createWorkloadModule = createWorkloadModule;
