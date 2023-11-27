"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostSchema = exports.Host = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const abstract_schema_1 = require("../../../shared/database/abstract.schema");
const paginate = require("mongoose-paginate-v2");
let Host = class Host extends abstract_schema_1.AbstractDocument {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Host.prototype, "knownSince", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Host.prototype, "publicKey", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Host.prototype, "lastAnnouncement", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Host.prototype, "netAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        uid: { type: String },
        validity: { type: Number },
        hostblockheight: { type: Number },
        updatepricetablecost: { type: String },
        accountbalancecost: { type: String },
        fundaccountcost: { type: String },
        latestrevisioncost: { type: String },
        subscriptionmemorycost: { type: String },
        subscriptionnotificationcost: { type: String },
        initbasecost: { type: String },
        memorytimecost: { type: String },
        downloadbandwidthcost: { type: String },
        uploadbandwidthcost: { type: String },
        dropsectorsbasecost: { type: String },
        dropsectorsunitcost: { type: String },
        hassectorbasecost: { type: String },
        readbasecost: { type: String },
        readlengthcost: { type: String },
        renewcontractcost: { type: String },
        revisionbasecost: { type: String },
        swapsectorcost: { type: String },
        writebasecost: { type: String },
        writelengthcost: { type: String },
        writestorecost: { type: String },
        txnfeeminrecommended: { type: String },
        txnfeemaxrecommended: { type: String },
        contractprice: { type: String },
        collateralcost: { type: String },
        maxcollateral: { type: String },
        maxduration: { type: Number },
        windowsize: { type: Number },
        registryentriesleft: { type: Number },
        registryentriestotal: { type: Number },
        expiry: { type: String },
    })),
    __metadata("design:type", Object)
], Host.prototype, "priceTable", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        acceptingcontracts: { type: Boolean },
        baserpcprice: { type: String },
        collateral: { type: String },
        contractprice: { type: String },
        downloadbandwidthprice: { type: String },
        ephemeralaccountexpiry: { type: Number },
        maxcollateral: { type: String },
        maxdownloadbatchsize: { type: Number },
        maxduration: { type: Number },
        maxrevisebatchsize: { type: Number },
        remainingstorage: { type: Number },
        revisionnumber: { type: Number },
        sectorsize: { type: Number },
        totalstorage: { type: Number },
        windowsize: { type: Number },
        maxephemeralaccountbalance: { type: String },
        netaddress: { type: String },
        sectoraccessprice: { type: String },
        siamuxport: { type: String },
        storageprice: { type: String },
        unlockhash: { type: String },
        uploadbandwidthprice: { type: String },
        version: { type: String },
    })),
    __metadata("design:type", Object)
], Host.prototype, "settings", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        TotalScans: { type: Number },
        LastScan: { type: String },
        LastScanSuccess: { type: Boolean },
        SecondToLastScanSuccess: { type: Boolean },
        Uptime: { type: Number },
        Downtime: { type: Number },
        SuccessfulInteractions: { type: Number },
        FailedInteractions: { type: Number },
    })),
    __metadata("design:type", Object)
], Host.prototype, "interactions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Host.prototype, "scanned", void 0);
Host = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Host);
exports.Host = Host;
exports.HostSchema = mongoose_1.SchemaFactory.createForClass(Host);
exports.HostSchema.plugin(paginate);
//# sourceMappingURL=host.schema.js.map