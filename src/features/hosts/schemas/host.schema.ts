import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { AbstractDocument } from "src/shared/database/abstract.schema";
import * as paginate from "mongoose-paginate-v2";


@Schema({ versionKey: false })
export class Host extends AbstractDocument {
    @Prop()
    knownSince: string;
  
    @Prop({unique: true})
    publicKey: string;
  
    @Prop()
    lastAnnouncement: string;
  
    @Prop()
    netAddress: string;
  
    @Prop(raw({
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
    }))
    priceTable: Record<string, any>;
  
    @Prop(raw({
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
    }))
    settings: Record<string, any>;
  
    @Prop(raw({
        TotalScans: { type: Number },
        LastScan: { type: String },
        LastScanSuccess: { type: Boolean },
        SecondToLastScanSuccess: { type: Boolean },
        Uptime: { type: Number },
        Downtime: { type: Number },
        SuccessfulInteractions: { type: Number },
        FailedInteractions: { type: Number },
    }))
    interactions: Record<string, any>;
  
    @Prop()
    scanned: boolean;
  }
  
export const HostSchema = SchemaFactory.createForClass(Host);
HostSchema.plugin(paginate);
HostSchema.index({ timestamp: -1 });
