import * as GeoJSON from 'geojson';

/** EnumRecurrenceFrequency enum. */
export declare enum EnumRecurrenceFrequency {
    Single = 0,
    Daily = 1,
    Weekly = 2,
    Monthly = 3,
    Yearly = 4
}

/** EnumRecurrenceFrequency enum. */
// use light definition

/** EnumWeekDay enum. */
// use light definition

/** EnumSeasonSuitability enum. */
export declare enum EnumSeasonSuitability {
    Unsuitable = 1,
    Depends = 2,
    Suitable = 3
}

/** EnumWeekDay enum. */
export declare enum EnumWeekDay {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

/**
 * Bounds Interface
 * @public
 */
export declare interface IBounds {
    sw: ICoordinate;
    ne: ICoordinate;
    extend(coord: ICoordinate): IBounds;
    toArray(): [number, number, number, number];
}

/**
 * @public
 */
export declare interface ICameraOptions {
    /**
     * Map center coordinate
     */
    center?: ICoordinate;
    /**
     * Map zoom level
     */
    zoom?: number;
}

/**
 * Coordinate Interface
 * @public
 */
export declare interface ICoordinate {
    lat: number;
    lng: number;
}

/**
 * @public
 */
export declare interface IEventData {
    [key: string]: any;
}

/**
 * Basic Interface for all layers
 * @public
 */
export declare interface ILayer<LAYOUT = ILayerLayout, PAINT = ILayerPaint> {
    id: string;
    type?: TLayerType;
    persistent?: TPersistType;
    data?: TLayerData;
    layout?: LAYOUT;
    paint?: PAINT;
}

/**
 * Basic layer layout options, being available for all layers
 * @public
 */
export declare interface ILayerLayout {
    visibility?: "visible" | "none";
}

/**
 * Basic layer paint options, being available for all layers
 * @public
 */
export declare interface ILayerPaint {
}

/**
 * @public
 */
export declare interface ILine extends ILayer<ILineLayout, ILinePaint> {
    /**
     * Line layout options
     */
    layout?: ILineLayout;
    /**
     * Line paint options
     */
    paint?: ILinePaint;
    /**
     * If **points** is defined, the API will generate a GeoJSON for the *data* automatically.
     * Using *data* and *points* together is not allowed.
     */
    points?: ICoordinate[];
}

/**
 * Additional layout settings for polylines
 * @public
 */
export declare interface ILineLayout extends ILayerLayout {
    cap?: "butt" | "round" | "square";
    arrows: boolean;
}

/**
 * Additional paint settings for polylines
 * @public
 */
export declare interface ILinePaint extends ILayerPaint {
    opacity?: number;
    color?: string;
    width?: number;
    blur?: number;
}

/**
 * Interface for different Map Implemenations
 * (e.g. Mapbox GL JS, Mapbox.js, Leaflet, ...)
 * @public
 */
export declare interface IMap<MAP> {
    getMap(): MAP;
    createMap(options: IMapOptions): MAP;
    /**
     * @since 1.0.1
     */
    isLoaded(): boolean;
    getContainer(): HTMLElement;
    setExperience(exp: string): Promise<void>;
    getExperience(): string | undefined;
    setMapStyle(id: string): void;
    /**
     * Resizes the map.
     * This should be done after changing the size of the container element.
     */
    resize(): void;
    addMarker(markerOptions: IMarkerOptions): IMarkerImpl;
    /**
     * Adds the default location marker to the map
     * @since 1.0.1
     * @param coordinate
     */
    addLocationMarker(coordinate: ICoordinate): IMarkerImpl;
    addLayer(layer: ILayer): ILayer;
    addLine(line: ILine): ILine;
    clearLine(line: ILine): void;
    addLineArrows(line: ILine): void;
    getDefaultSearchAPI(): IMetaSearch<IMetaLightResult>;
    /**
     * @since 1.0.1
     */
    getFullSearchAPI(): IMetaSearch<IMetaResult>;
    loadMetaLayer(metaLayer: IMetaLayer): Promise<IMetaLayer>;
    clearMetaLayer(metaLayer: IMetaLayer): void;
    getMetaLayer(): IMetaLayer | undefined;
    /**
     * Shows d.meta data on the map.
     * @since 1.0.1 (possible to use IMetaLightResult)
     * @param requestOrData - d.meta request or d.meta result data
     */
    showContent(requestOrData: IMetaRequest | IMetaLightResult): Promise<IMetaLayer>;
    fitBounds(coordinates: ICoordinate[]): void;
    fitLayer(layer: ILayer): void;
    showTour(globalId: string): Promise<ILine>;
    clearTour(): void;
    showPopup(popup: IPopup): void;
    createPopup(item: IMetaLightItem | IMetaItem | IWrappedItem): IPopup;
    /**
     * @since 1.0.1
     */
    hidePopup(): void;
    isFullscreen(): boolean;
    setFullscreen(fullscreen: boolean): void;
    findItem(guid: string): Promise<IWrappedItem>;
    showItem(item: IMetaLightItem | IWrappedItem, options?: ICameraOptions): void;
    selectItem(item: IMetaLightItem | IWrappedItem, data?: IEventData): void;
    getSelectedItem(): IWrappedItem | undefined;
    unselectAll(): void;
    getPredefinedConfig(): Promise<IPredefinedConfig>;
    flyTo(options: ICameraOptions): void;
    /**
     * Adds a event listener.
     * All available events can be found at [[IMapEvents]]
     * @param type  - [[IMapsEvents]]
     * @param listener - Listener Function
     * @example
     * ```javascript
     *
     * map.on("load", function(event) {
     *   event.map.showContent( { experience: "demo-dahoam", limit: 5 } );
     * });
     * ```
     */
    on<TYPE extends TEventType>(type: TYPE, listener: TEventTypeListener<TYPE>): void;
    /**
     * Removes a event listener.
     * All available events can be found at [[IMapEvents]]
     * @param type - [[IMapsEvents]]
     * @param listener - Listener Function
     */
    off<TYPE extends TEventType>(type: TYPE, listener: TEventTypeListener<TYPE>): void;
    fire<TYPE extends TEventType>(type: TYPE, event: IMapEvents[TYPE]): void;
}

/**
 * @public
 */
export declare interface IMapEvent {
    map: IMap<any>;
    type?: string;
    data?: IEventData;
}

/**
 * @public
 */
export declare interface IMapEventExperienceChanged extends IMapEvent {
    experience: string;
}

/**
 * @public
 */
export declare interface IMapEventItemSelected extends IMapEvent {
    item: IWrappedItem;
}

/**
 * @public
 */
export declare interface IMapEventMetaSearching extends IMapEvent {
    loading: boolean;
}

/**
 * List of all available events for [[IMap.on]], [[IMap.off]]
 * @public
 */
export declare interface IMapEvents {
    "load": IMapEvent;
    "item-selected": IMapEventItemSelected;
    "experience-changed": IMapEventExperienceChanged;
    "meta-search": IMapEventMetaSearching;
}

/**
 * Map Options
 * @public
 */
export declare interface IMapOptions extends ICameraOptions {
    /**
     * Experience (destination.one project name)
     */
    experience?: string;
    /**
     * **ID** of the map container *DIV* element
     */
    container: string;
    /**
     * id of the inital map style.
     * If undefined or not found, then the default style will be used.
     * @since 1.0.1
     */
    style?: string;
    /**
     * if true, the style changer control will be added to the map.
     * @default true
     * @since 1.0.1
     */
    styleControl?: boolean;
    /**
     * if true, the Geolocate control will be added to the map
     * @default true
     * @since 1.0.1
     */
    geolocateControl?: boolean;
    /**
     * if true, the Fullscreen control will be added to the map
     * @default true
     * @since 1.0.1
     */
    fullscreenControl?: boolean;
    /**
     * If set to false, one finger panning will be disabled and an overlay will be shown.
     * @default true
     * @since 1.0.1
     */
    oneFingerPan?: boolean;
}

/**
 * @public
 */
export declare interface IMarkerImpl {
    remove(): void;
}

/**
 * @public
 */
export declare interface IMarkerOptions extends IMarkerType {
    lat?: number;
    lng?: number;
    popup?: IPopup;
    /**
     * Force using the HTMLElement for the Marker
     * @since 1.0.1
     */
    element?: HTMLElement;
}

/**
 * @public
 */
export declare interface IMarkerType {
    color?: string;
    icon?: string;
    pinType?: PinType;
}

/** Properties of a MetaAddress. */
export declare interface IMetaAddress extends IMetaLightAddress {

    /** MetaAddress name */
    name?: (string|null);

    /** MetaAddress city */
    city?: (string|null);

    /** MetaAddress zip */
    zip?: (string|null);

    /** MetaAddress street */
    street?: (string|null);

    /** MetaAddress housenumber */
    housenumber?: (string|null);

    /** MetaAddress phone */
    phone?: (string|null);

    /** MetaAddress fax */
    fax?: (string|null);

    /** MetaAddress web */
    web?: (string|null);

    /** MetaAddress email */
    email?: (string|null);

    /** MetaAddress image */
    image?: (string|null);

    /** MetaAddress district */
    district?: (string|null);

    /** MetaAddress postoffice */
    postoffice?: (string|null);

    /** MetaAddress company */
    company?: (string|null);

    /** MetaAddress phone2 */
    phone2?: (string|null);

    /** MetaAddress rel */
    rel?: (TMetaAddressRel|null);
}

/** Properties of a MetaAttribute. */
export declare interface IMetaAttribute extends IMetaLightAttribute {

    /** MetaAttribute key */
    key?: (string|null);

    /** MetaAttribute value */
    value?: (string|null);
}

/** Properties of a MetaChannel. */
export declare interface IMetaChannel {

    /** MetaChannel title */
    title?: (string|null);

    /** MetaChannel description */
    description?: (string|null);

    /** MetaChannel link */
    link?: (string|null);

    /** MetaChannel copyright */
    copyright?: (string|null);

    /** MetaChannel id */
    id?: (number|null);
}

/** Properties of a MetaCoordinate. */
export declare interface IMetaCoordinate extends IMetaLightCoordinate {

    /** MetaCoordinate latitude */
    latitude?: (number|null);

    /** MetaCoordinate longitude */
    longitude?: (number|null);

    /** MetaCoordinate value */
    value?: (string|null);
}

/** Properties of a MetaDateTimeOffset. */
export declare interface IMetaDateTimeOffset extends IMetaLightDateTimeOffset {

    /** MetaDateTimeOffset timestamp */
    timestamp?: (number|null);

    /** MetaDateTimeOffset offsetMinutes */
    offsetMinutes?: (number|null);
}

/** Properties of a MetaFacet. */
export declare interface IMetaFacet extends IMetaLightFacet {

    /** MetaFacet value */
    value?: (string|null);

    /** MetaFacet count */
    count?: (number|null);

    /** MetaFacet q */
    q?: (string|null);

    /** MetaFacet label */
    label?: (string|null);
}

/** Properties of a MetaFacetGroup. */
export declare interface IMetaFacetGroup extends IMetaLightFacetGroup {

    /** MetaFacetGroup facets */
    facets?: (IMetaFacet[]|null);

    /** MetaFacetGroup field */
    field?: (string|null);
}

/**
 * This interface provides additional client side filter properties, useful for performance optimizations.
 */
export declare interface IMetaFilters {
    /**
     * Performance Filter: this will reduce ET2014A.json to return only the geometry result and the global id.
     * This can be used for getting the line data for tours, if not yet available with "light" schema.
     * Internally the undocumented d.meta Feature "json-filter" will be used and will currenty only work for the d.meta JSON schema.
     */
    geometryOnly?: boolean;
}

/** Properties of a MetaGeo. */
export declare interface IMetaGeo extends IMetaLightGeo {

    /** MetaGeo main */
    main?: (IMetaCoordinate|null);

    /** MetaGeo entry */
    entry?: (IMetaCoordinate[]|null);

    /** MetaGeo geometry */
    geometry?: (IMetaGeometry|null);

    /** MetaGeo attributes */
    attributes?: (IMetaGeoAttribute[]|null);
}

/** Properties of a MetaGeoAttribute. */
export declare interface IMetaGeoAttribute {

    /** MetaGeoAttribute index */
    index?: (number|null);

    /** MetaGeoAttribute classification */
    classification?: (string|null);
}

/** Properties of a MetaGeometry. */
export declare interface IMetaGeometry extends IMetaLightGeometry {

    /** MetaGeometry type */
    type?: (TMetaGeometryType|null);

    /** MetaGeometry value */
    value?: (string|null);
}

/** Properties of a MetaHyperObject. */
export declare interface IMetaHyperObject {

    /** MetaHyperObject source */
    source?: (string|null);

    /** MetaHyperObject url */
    url?: (string|null);

    /** MetaHyperObject isBookable */
    isBookable?: (boolean|null);

    /** MetaHyperObject isRequestable */
    isRequestable?: (boolean|null);

    /** MetaHyperObject attributes */
    attributes?: (IMetaAttribute[]|null);

    /** MetaHyperObject numbers */
    numbers?: (IMetaNumber[]|null);

    /** MetaHyperObject hyperSubObjects */
    hyperSubObjects?: (IMetaHyperSubObject[]|null);
}

/** Properties of a MetaHyperSubObject. */
export declare interface IMetaHyperSubObject {

    /** MetaHyperSubObject title */
    title?: (string|null);

    /** MetaHyperSubObject type */
    type?: (string|null);

    /** MetaHyperSubObject changed */
    changed?: (IMetaDateTimeOffset|null);

    /** MetaHyperSubObject texts */
    texts?: (IMetaText[]|null);

    /** MetaHyperSubObject attributes */
    attributes?: (IMetaAttribute[]|null);

    /** MetaHyperSubObject media_objects */
    media_objects?: (IMetaMediaObject[]|null);

    /** MetaHyperSubObject keywords */
    keywords?: (string[]|null);

    /** MetaHyperSubObject numbers */
    numbers?: (IMetaNumber[]|null);
}

/** Properties of a MetaInstruction. */
export declare interface IMetaInstruction {

    /** MetaInstruction action */
    action?: (string|null);

    /** MetaInstruction lat */
    lat?: (number|null);

    /** MetaInstruction lon */
    lon?: (number|null);

    /** MetaInstruction distance */
    distance?: (number|null);

    /** MetaInstruction time */
    time?: (number|null);

    /** MetaInstruction value */
    value?: (string|null);
}

/** Properties of a MetaItem. */
export declare interface IMetaItem extends IMetaLightItem {

    /** MetaItem global_id */
    global_id?: (string|null);

    /** MetaItem channel_id */
    channel_id?: (number|null);

    /** MetaItem id */
    id?: (string|null);

    /** MetaItem title */
    title?: (string|null);

    /** MetaItem type */
    type?: (TMetaItemType|null);

    /** MetaItem categories */
    categories?: (string[]|null);

    /** MetaItem texts */
    texts?: (IMetaText[]|null);

    /** MetaItem country */
    country?: (string|null);

    /** MetaItem areas */
    areas?: (string[]|null);

    /** MetaItem city */
    city?: (string|null);

    /** MetaItem zip */
    zip?: (string|null);

    /** MetaItem street */
    street?: (string|null);

    /** MetaItem housenumber */
    housenumber?: (string|null);

    /** MetaItem phone */
    phone?: (string|null);

    /** MetaItem fax */
    fax?: (string|null);

    /** MetaItem web */
    web?: (string|null);

    /** MetaItem email */
    email?: (string|null);

    /** MetaItem author */
    author?: (string|null);

    /** MetaItem geo */
    geo?: (IMetaGeo|null);

    /** MetaItem ratings */
    ratings?: (IMetaRating[]|null);

    /** MetaItem cuisine_types */
    cuisine_types?: (string[]|null);

    /** MetaItem payment */
    payment?: (string[]|null);

    /** MetaItem highlight */
    highlight?: (boolean|null);

    /** MetaItem accessibility */
    accessibility?: (boolean|null);

    /** MetaItem child_friendly */
    child_friendly?: (boolean|null);

    /** MetaItem media_objects */
    media_objects?: (IMetaMediaObject[]|null);

    /** MetaItem keywords */
    keywords?: (string[]|null);

    /** MetaItem timeIntervals */
    timeIntervals?: (IMetaTimeInterval[]|null);

    /** MetaItem kitchenTimeIntervals */
    kitchenTimeIntervals?: (IMetaTimeInterval[]|null);

    /** MetaItem alwaysOpen */
    alwaysOpen?: (boolean|null);

    /** MetaItem kitchenAlwaysOpen */
    kitchenAlwaysOpen?: (boolean|null);

    /** MetaItem numbers */
    numbers?: (IMetaNumber[]|null);

    /** MetaItem calc_distance */
    calc_distance?: (number|null);

    /** MetaItem name */
    name?: (string|null);

    /** MetaItem attributes */
    attributes?: (IMetaAttribute[]|null);

    /** MetaItem features */
    features?: (string[]|null);

    /** MetaItem addresses */
    addresses?: (IMetaAddress[]|null);

    /** MetaItem created */
    created?: (IMetaDateTimeOffset|null);

    /** MetaItem changed */
    changed?: (IMetaDateTimeOffset|null);

    /** MetaItem source */
    source?: (IMetaSource|null);

    /** MetaItem company */
    company?: (string|null);

    /** MetaItem district */
    district?: (string|null);

    /** MetaItem postoffice */
    postoffice?: (string|null);

    /** MetaItem phone2 */
    phone2?: (string|null);

    /** MetaItem duration */
    duration?: (number|null);

    /** MetaItem length */
    length?: (number|null);

    /** MetaItem elevationMin */
    elevationMin?: (number|null);

    /** MetaItem elevationMax */
    elevationMax?: (number|null);

    /** MetaItem totalAscent */
    totalAscent?: (number|null);

    /** MetaItem totalDescent */
    totalDescent?: (number|null);

    /** MetaItem roundTrip */
    roundTrip?: (boolean|null);

    /** MetaItem seasons */
    seasons?: (IMetaSeason[]|null);

    /** MetaItem subitems */
    subitems?: (IMetaSubItem[]|null);

    /** MetaItem hyperObjects */
    hyperObjects?: (IMetaHyperObject[]|null);
}

/**
 * @public
 */
export declare interface IMetaLayer extends IMetaLayerOptions {
    findItem(globalId: string): Promise<IMetaLightItem>;
}

/**
 * Additional layout settings for for the d.meta layer
 * @public
 */
export declare interface IMetaLayerLayout extends ILayerLayout {
}

/**
 * @public
 */
export declare interface IMetaLayerOptions extends ILayer<IMetaLayerLayout, IMetaLayerPaint> {
    /**
     * d.meta layer layout options
     */
    layout?: IMetaLayerLayout;
    /**
     * d.meta layer paint options
     */
    paint?: IMetaLayerPaint;
    /**
     * d.meta request for rebuilding the layer
     */
    request?: IMetaRequest;
    /**
     * d.meta result (cache)
     */
    result?: IMetaLightResult;
}

/**
 * Additional paint settings for the d.meta layer
 * @public
 */
export declare interface IMetaLayerPaint extends ILayerPaint {
    color?: string;
}

/** Properties of a MetaLegacyParameter. */
export declare interface IMetaLegacyParameter {

    /** MetaLegacyParameter waitForAll */
    waitForAll?: (boolean|null);

    /** MetaLegacyParameter minQuality */
    minQuality?: (number|null);

    /** MetaLegacyParameter maxResonseTime */
    maxResonseTime?: (number|null);

    /** MetaLegacyParameter bookable */
    bookable?: (boolean|null);

    /** MetaLegacyParameter searchType */
    searchType?: (string|null);

    /** MetaLegacyParameter people */
    people?: (number|null);

    /** MetaLegacyParameter eventStartdate */
    eventStartdate?: (string|null);

    /** MetaLegacyParameter eventEnddate */
    eventEnddate?: (string|null);

    /** MetaLegacyParameter routeId */
    routeId?: (string|null);

    /** MetaLegacyParameter options */
    options?: (string|null);

    /** MetaLegacyParameter imageHeight */
    imageHeight?: (number|null);

    /** MetaLegacyParameter imageWidth */
    imageWidth?: (number|null);

    /** MetaLegacyParameter detailStyle */
    detailStyle?: (string|null);

    /** MetaLegacyParameter useGeocoding */
    useGeocoding?: (boolean|null);

    /** MetaLegacyParameter useSuggestion */
    useSuggestion?: (boolean|null);

    /** MetaLegacyParameter starttime */
    starttime?: (string|null);

    /** MetaLegacyParameter endtime */
    endtime?: (string|null);
}

/** Properties of a MetaLightAddress. */
export declare interface IMetaLightAddress {

    /** MetaLightAddress name */
    name?: (string|null);

    /** MetaLightAddress rel */
    rel?: (TMetaAddressRel|null);
}

/** Properties of a MetaLightAttribute. */
export declare interface IMetaLightAttribute {

    /** MetaLightAttribute key */
    key?: (string|null);

    /** MetaLightAttribute value */
    value?: (string|null);
}

/** Properties of a MetaLightCoordinate. */
export declare interface IMetaLightCoordinate {

    /** MetaLightCoordinate latitude */
    latitude?: (number|null);

    /** MetaLightCoordinate longitude */
    longitude?: (number|null);

    /** MetaLightCoordinate value */
    value?: (string|null);
}

/** Properties of a MetaLightDateTimeOffset. */
export declare interface IMetaLightDateTimeOffset {

    /** MetaLightDateTimeOffset timestamp */
    timestamp?: (number|null);

    /** MetaLightDateTimeOffset offsetMinutes */
    offsetMinutes?: (number|null);
}

/** Properties of a MetaLightFacet. */
export declare interface IMetaLightFacet {

    /** MetaLightFacet value */
    value?: (string|null);

    /** MetaLightFacet count */
    count?: (number|null);

    /** MetaLightFacet q */
    q?: (string|null);

    /** MetaLightFacet label */
    label?: (string|null);
}

/** Properties of a MetaLightFacetGroup. */
export declare interface IMetaLightFacetGroup {

    /** MetaLightFacetGroup facets */
    facets?: (IMetaLightFacet[]|null);

    /** MetaLightFacetGroup field */
    field?: (string|null);
}

/** Properties of a MetaLightGeo. */
export declare interface IMetaLightGeo {

    /** MetaLightGeo main */
    main?: (IMetaLightCoordinate|null);

    /** MetaLightGeo geometry */
    geometry?: (IMetaLightGeometry|null);
}

/** Properties of a MetaLightGeometry. */
export declare interface IMetaLightGeometry {

    /** MetaLightGeometry type */
    type?: (TMetaGeometryType|null);

    /** MetaLightGeometry value */
    value?: (string|null);
}

/** Properties of a MetaLightItem. */
export declare interface IMetaLightItem {

    /** MetaLightItem global_id */
    global_id?: (string|null);

    /** MetaLightItem channel_id */
    channel_id?: (number|null);

    /** MetaLightItem id */
    id?: (string|null);

    /** MetaLightItem title */
    title?: (string|null);

    /** MetaLightItem type */
    type?: (TMetaItemType|null);

    /** MetaLightItem categories */
    categories?: (string[]|null);

    /** MetaLightItem texts */
    texts?: (IMetaLightText[]|null);

    /** MetaLightItem country */
    country?: (string|null);

    /** MetaLightItem city */
    city?: (string|null);

    /** MetaLightItem zip */
    zip?: (string|null);

    /** MetaLightItem street */
    street?: (string|null);

    /** MetaLightItem phone */
    phone?: (string|null);

    /** MetaLightItem geo */
    geo?: (IMetaLightGeo|null);

    /** MetaLightItem ratings */
    ratings?: (IMetaLightRating[]|null);

    /** MetaLightItem cuisine_types */
    cuisine_types?: (string[]|null);

    /** MetaLightItem highlight */
    highlight?: (boolean|null);

    /** MetaLightItem media_objects */
    media_objects?: (IMetaLightMediaObject[]|null);

    /** MetaLightItem timeIntervals */
    timeIntervals?: (IMetaLightTimeInterval[]|null);

    /** MetaLightItem numbers */
    numbers?: (IMetaLightNumber[]|null);

    /** MetaLightItem calc_distance */
    calc_distance?: (number|null);

    /** MetaLightItem name */
    name?: (string|null);

    /** MetaLightItem attributes */
    attributes?: (IMetaLightAttribute[]|null);

    /** MetaLightItem addresses */
    addresses?: (IMetaLightAddress[]|null);

    /** MetaLightItem source */
    source?: (IMetaLightSource|null);

    /** MetaLightItem district */
    district?: (string|null);

    /** MetaLightItem duration */
    duration?: (number|null);

    /** MetaLightItem length */
    length?: (number|null);

    /** MetaLightItem totalAscent */
    totalAscent?: (number|null);

    /** MetaLightItem totalDescent */
    totalDescent?: (number|null);
}

/** Properties of a MetaLightMediaObject. */
export declare interface IMetaLightMediaObject {

    /** MetaLightMediaObject rel */
    rel?: (TMetaMediaObjectRel|null);

    /** MetaLightMediaObject url */
    url?: (string|null);

    /** MetaLightMediaObject type */
    type?: (string|null);

    /** MetaLightMediaObject author */
    author?: (string|null);

    /** MetaLightMediaObject source */
    source?: (string|null);

    /** MetaLightMediaObject prio */
    prio?: (number|null);

    /** MetaLightMediaObject value */
    value?: (string|null);
}

/** Properties of a MetaLightNumber. */
export declare interface IMetaLightNumber {

    /** MetaLightNumber type */
    type?: (string|null);

    /** MetaLightNumber value */
    value?: (number|null);
}

/** Properties of a MetaLightRating. */
export declare interface IMetaLightRating {

    /** MetaLightRating type */
    type?: (string|null);

    /** MetaLightRating value */
    value?: (number|null);
}

/** Properties of a MetaLightResult. */
export declare interface IMetaLightResult {

    /** MetaLightResult status */
    status?: (TMetaStatusType|null);

    /** MetaLightResult message */
    message?: (string|null);

    /** MetaLightResult count */
    count?: (number|null);

    /** MetaLightResult overallcount */
    overallcount?: (number|null);

    /** MetaLightResult facetGroups */
    facetGroups?: (IMetaLightFacetGroup[]|null);

    /** MetaLightResult items */
    items?: (IMetaLightItem[]|null);
}

/** Properties of a MetaLightSource. */
export declare interface IMetaLightSource {

    /** MetaLightSource url */
    url?: (string|null);

    /** MetaLightSource value */
    value?: (string|null);
}

/** Properties of a MetaLightText. */
export declare interface IMetaLightText {

    /** MetaLightText rel */
    rel?: (TMetaTextRel|null);

    /** MetaLightText type */
    type?: (TMetaTextType|null);

    /** MetaLightText value */
    value?: (string|null);
}

/** Properties of a MetaLightTimeInterval. */
export declare interface IMetaLightTimeInterval {

    /** MetaLightTimeInterval weekdays */
    weekdays?: (EnumWeekDay[]|null);

    /** MetaLightTimeInterval start */
    start?: (IMetaLightDateTimeOffset|null);

    /** MetaLightTimeInterval end */
    end?: (IMetaLightDateTimeOffset|null);

    /** MetaLightTimeInterval repeatUntil */
    repeatUntil?: (IMetaLightDateTimeOffset|null);

    /** MetaLightTimeInterval tz */
    tz?: (string|null);

    /** MetaLightTimeInterval freq */
    freq?: (EnumRecurrenceFrequency|null);

    /** MetaLightTimeInterval dayOrdinal */
    dayOrdinal?: (number|null);

    /** MetaLightTimeInterval weekday */
    weekday?: (EnumWeekDay|null);

    /** MetaLightTimeInterval month */
    month?: (number|null);

    /** MetaLightTimeInterval dayOfMonth */
    dayOfMonth?: (number|null);

    /** MetaLightTimeInterval interval */
    interval?: (number|null);

    /** MetaLightTimeInterval repeatCount */
    repeatCount?: (number|null);

    /** MetaLightTimeInterval hideEnd */
    hideEnd?: (boolean|null);
}

/** Properties of a MetaMediaObject. */
export declare interface IMetaMediaObject extends IMetaLightMediaObject {

    /** MetaMediaObject rel */
    rel?: (TMetaMediaObjectRel|null);

    /** MetaMediaObject url */
    url?: (string|null);

    /** MetaMediaObject type */
    type?: (string|null);

    /** MetaMediaObject author */
    author?: (string|null);

    /** MetaMediaObject source */
    source?: (string|null);

    /** MetaMediaObject latitude */
    latitude?: (number|null);

    /** MetaMediaObject longitude */
    longitude?: (number|null);

    /** MetaMediaObject theme */
    theme?: (string|null);

    /** MetaMediaObject ratio */
    ratio?: (TMetaMediaObjectRatio|null);

    /** MetaMediaObject prio */
    prio?: (number|null);

    /** MetaMediaObject description */
    description?: (string|null);

    /** MetaMediaObject value */
    value?: (string|null);
}

/** Properties of a MetaNumber. */
export declare interface IMetaNumber extends IMetaLightNumber {

    /** MetaNumber type */
    type?: (string|null);

    /** MetaNumber value */
    value?: (number|null);
}

/** Properties of a MetaParameter. */
export declare interface IMetaParameter {

    /** MetaParameter experience */
    experience?: (string|null);

    /** MetaParameter type */
    type?: (string|null);

    /** MetaParameter q */
    q?: (string|null);

    /** MetaParameter limit */
    limit?: (number|null);

    /** MetaParameter facets */
    facets?: (boolean|null);

    /** MetaParameter mkt */
    mkt?: (string|null);

    /** MetaParameter licenseKey */
    licenseKey?: (string|null);

    /** MetaParameter latitude */
    latitude?: (number|null);

    /** MetaParameter longitude */
    longitude?: (number|null);

    /** MetaParameter distance */
    distance?: (number|null);

    /** MetaParameter unique */
    unique?: (boolean|null);

    /** MetaParameter sort */
    sort?: (string|null);

    /** MetaParameter startdate */
    startdate?: (string|null);

    /** MetaParameter enddate */
    enddate?: (string|null);

    /** MetaParameter offset */
    offset?: (number|null);

    /** MetaParameter categoryOutputMode */
    categoryOutputMode?: (string|null);

    /** MetaParameter unrollIntervals */
    unrollIntervals?: (boolean|null);

    /** MetaParameter predefined */
    predefined?: (string|null);

    /** MetaParameter mode */
    mode?: (string|null);

    /** MetaParameter legacy */
    legacy?: (IMetaLegacyParameter|null);
}

/** Properties of a MetaRating. */
export declare interface IMetaRating extends IMetaLightRating {

    /** MetaRating type */
    type?: (string|null);

    /** MetaRating votes */
    votes?: (number|null);

    /** MetaRating value */
    value?: (number|null);
}

/** Properties of a MetaRequest. */
export declare interface IMetaRequest {

    /** MetaRequest experience */
    experience?: (string|null);

    /** MetaRequest type */
    type?: (TMetaRequestType|null);

    /** MetaRequest q */
    q?: (string|null);

    /** MetaRequest limit */
    limit?: (number|null);

    /** MetaRequest facets */
    facets?: (boolean|null);

    /** MetaRequest mkt */
    mkt?: (string|null);

    /** MetaRequest licenseKey */
    licenseKey?: (string|null);

    /** MetaRequest latitude */
    latitude?: (number|null);

    /** MetaRequest longitude */
    longitude?: (number|null);

    /** MetaRequest distance */
    distance?: (number|null);

    /** MetaRequest unique */
    unique?: (boolean|null);

    /** MetaRequest sort */
    sort?: (string|null);

    /** MetaRequest startdate */
    startdate?: (string|null);

    /** MetaRequest enddate */
    enddate?: (string|null);

    /** MetaRequest offset */
    offset?: (number|null);

    /** MetaRequest categoryOutputMode */
    categoryOutputMode?: (string|null);

    /** MetaRequest unrollIntervals */
    unrollIntervals?: (boolean|null);

    /** MetaRequest predefined */
    predefined?: (string|null);

    /** MetaRequest mode */
    mode?: (string|null);

    /** MetaRequest template */
    template?: (string|null);

    /** MetaRequest encoding */
    encoding?: (string|null);

    /** MetaRequest tz */
    tz?: (string|null);

    /** MetaRequest parameters */
    parameters?: (IMetaParameter[]|null);
}

/** Properties of a MetaResult. */
export declare interface IMetaResult extends IMetaLightResult {

    /** MetaResult status */
    status?: (TMetaStatusType|null);

    /** MetaResult message */
    message?: (string|null);

    /** MetaResult count */
    count?: (number|null);

    /** MetaResult overallcount */
    overallcount?: (number|null);

    /** MetaResult channels */
    channels?: (IMetaChannel[]|null);

    /** MetaResult facetGroups */
    facetGroups?: (IMetaFacetGroup[]|null);

    /** MetaResult items */
    items?: (IMetaItem[]|null);
}

/**
 * @public
 */
export declare interface IMetaSearch<RESULT> {
    isLoading: boolean;
    search(request: IMetaRequest, filters?: IMetaFilters): Promise<RESULT>;
    abort(): void;
}

/** Properties of a MetaSeason. */
export declare interface IMetaSeason {

    /** MetaSeason month */
    month?: (number|null);

    /** MetaSeason suitable */
    suitable?: (EnumSeasonSuitability|null);
}

/** Properties of a MetaSource. */
export declare interface IMetaSource extends IMetaLightSource {

    /** MetaSource url */
    url?: (string|null);

    /** MetaSource value */
    value?: (string|null);
}

/** Properties of a MetaSubItem. */
export declare interface IMetaSubItem {

    /** MetaSubItem id */
    id?: (string|null);

    /** MetaSubItem title */
    title?: (string|null);

    /** MetaSubItem type */
    type?: (TMetaItemType|null);

    /** MetaSubItem geo */
    geo?: (IMetaGeo|null);

    /** MetaSubItem ref */
    ref?: (string|null);

    /** MetaSubItem categories */
    categories?: (string[]|null);

    /** MetaSubItem features */
    features?: (string[]|null);

    /** MetaSubItem texts */
    texts?: (IMetaText[]|null);

    /** MetaSubItem ratings */
    ratings?: (IMetaRating[]|null);

    /** MetaSubItem media_objects */
    media_objects?: (IMetaMediaObject[]|null);

    /** MetaSubItem keywords */
    keywords?: (string[]|null);

    /** MetaSubItem numbers */
    numbers?: (IMetaNumber[]|null);

    /** MetaSubItem attributes */
    attributes?: (IMetaAttribute[]|null);

    /** MetaSubItem instructions */
    instructions?: (IMetaInstruction[]|null);
}

/** Properties of a MetaText. */
export declare interface IMetaText extends IMetaLightText {

    /** MetaText rel */
    rel?: (TMetaTextRel|null);

    /** MetaText type */
    type?: (TMetaTextType|null);

    /** MetaText author */
    author?: (string|null);

    /** MetaText source */
    source?: (string|null);

    /** MetaText value */
    value?: (string|null);
}

/** Properties of a MetaTimeInterval. */
export declare interface IMetaTimeInterval extends IMetaLightTimeInterval {

    /** MetaTimeInterval weekdays */
    weekdays?: (EnumWeekDay[]|null);

    /** MetaTimeInterval start */
    start?: (IMetaDateTimeOffset|null);

    /** MetaTimeInterval end */
    end?: (IMetaDateTimeOffset|null);

    /** MetaTimeInterval repeatUntil */
    repeatUntil?: (IMetaDateTimeOffset|null);

    /** MetaTimeInterval tz */
    tz?: (string|null);

    /** MetaTimeInterval freq */
    freq?: (EnumRecurrenceFrequency|null);

    /** MetaTimeInterval dayOrdinal */
    dayOrdinal?: (number|null);

    /** MetaTimeInterval weekday */
    weekday?: (EnumWeekDay|null);

    /** MetaTimeInterval month */
    month?: (number|null);

    /** MetaTimeInterval dayOfMonth */
    dayOfMonth?: (number|null);

    /** MetaTimeInterval interval */
    interval?: (number|null);

    /** MetaTimeInterval repeatCount */
    repeatCount?: (number|null);

    /** MetaTimeInterval hideEnd */
    hideEnd?: (boolean|null);
}

/**
 * Point Interface
 * @public
 */
export declare interface IPoint {
    x: number;
    y: number;
}

/**
 * @public
 */
export declare interface IPopup {
    anchor?: TPopupAnchor;
    className?: string;
    offset?: IPoint;
    position?: ICoordinate;
    url?: string;
    closeButton?: boolean;
    getHTML: () => string;
    /** @since 1.0.1 */
    maxWidth?: string;
}

/**
 * @public
 * @since 1.0.1
 */
export declare interface IPopupImpl {
    isOpen(): boolean;
    remove(): void;
}

/** Properties of a PredefinedConfig. */
export declare interface IPredefinedConfig {

    /** PredefinedConfig query_defaults */
    query_defaults?: (IPredefinedQueryDefaults|null);

    /** PredefinedConfig query_list */
    query_list?: (IPredefinedQuery[]|null);

    /** PredefinedConfig unused_list */
    unused_list?: (IPredefinedQuery[]|null);

    /** PredefinedConfig inherit */
    inherit?: (string|null);

    /** PredefinedConfig clear_list */
    clear_list?: (boolean|null);

    /** PredefinedConfig experience */
    experience?: (string|null);
}

/** Properties of a PredefinedQuery. */
export declare interface IPredefinedQuery {

    /** PredefinedQuery sort */
    sort?: (string|null);

    /** PredefinedQuery view */
    view?: (string|null);

    /** PredefinedQuery cal_view */
    cal_view?: (string|null);

    /** PredefinedQuery mode */
    mode?: (string|null);

    /** PredefinedQuery type */
    type?: (string|null);

    /** PredefinedQuery experience */
    experience?: (string|null);

    /** PredefinedQuery limit */
    limit?: (number|null);

    /** PredefinedQuery distance */
    distance?: (number|null);

    /** PredefinedQuery layout */
    layout?: (string|null);

    /** PredefinedQuery audience */
    audience?: (string|null);

    /** PredefinedQuery title_list */
    title_list?: (IPredefinedQueryTitle[]|null);

    /** PredefinedQuery q_list */
    q_list?: (IPredefinedQueryQ[]|null);

    /** PredefinedQuery query_list */
    query_list?: (IPredefinedQuery[]|null);

    /** PredefinedQuery id */
    id?: (string|null);

    /** PredefinedQuery ref */
    ref?: (string|null);

    /** PredefinedQuery action */
    action?: (string|null);

    /** PredefinedQuery source */
    source?: (string|null);

    /** PredefinedQuery prio */
    prio?: (number|null);

    /** PredefinedQuery terminal */
    terminal?: (string|null);

    /** PredefinedQuery portal */
    portal?: (boolean|null);

    /** PredefinedQuery slideshow */
    slideshow?: (boolean|null);
}

/** Properties of a PredefinedQueryDefaults. */
export declare interface IPredefinedQueryDefaults {

    /** PredefinedQueryDefaults limit */
    limit?: (number|null);

    /** PredefinedQueryDefaults prefix */
    prefix?: (string|null);
}

/** Properties of a PredefinedQueryQ. */
export declare interface IPredefinedQueryQ {

    /** PredefinedQueryQ lang */
    lang?: (string|null);

    /** PredefinedQueryQ value */
    value?: (string|null);
}

/** Properties of a PredefinedQueryTitle. */
export declare interface IPredefinedQueryTitle {

    /** PredefinedQueryTitle lang */
    lang?: (string|null);

    /** PredefinedQueryTitle value */
    value?: (string|null);
}

/**
 * @public
 */
export declare interface IWrappedItem<ITEM extends IMetaLightItem = IMetaLightItem> {
    /**
     * ITEM extends [[IMetaLightItem]]
     */
    innerItem: ITEM;
    id: string;
    title: string;
    defaultImageUrl: string | undefined;
    points: ICoordinate[] | undefined;
    coordinate: ICoordinate | undefined;
    pinType: PinType;
    markerType: IMarkerType;
    markerOptions: IMarkerOptions;
    popup: IPopup;
    geoPoint: GeoJSON.Feature<GeoJSON.Point, TLayerProperties>;
    line: ILine;
}

/**
 * @public
 */
export declare interface IWrappedItemUrlProvider {
    createUrl(item: IWrappedItem): string;
}

export declare class Maps {
    static version: string;
    static newMap(options: IMapOptions, mapType?: "mapboxgl" | "leaflet"): IMap<any>;
    static useMap(map: any): IMap<any>;
    static isSupported(mapType?: "mapboxgl" | "leaflet"): boolean;
}

/**
 * eContent.PinType for Compatibility
 * @public
 */
export declare enum PinType {
    Default = 0,
    Hotel = 1,
    Event = 2,
    Gastro = 3,
    Tour = 4,
    POI = 5,
    City = 6,
    Area = 7,
    Package = 8,
    Article = 9
}

/**
 * All available events can be found at [[IMapEvents]]
 * @public
 */
export declare type TEventType = keyof IMapEvents;

/**
 * All available events can be found at [[IMapEvents]]
 * @public
 */
export declare type TEventTypeListener<TYPE extends TEventType> = (event: IMapEvents[TYPE]) => void;

/**
 * Layer data as GeoJSON (Feauture or FeatureCollection)
 * @public
 */
export declare type TLayerData = GeoJSON.Feature<GeoJSON.Geometry, TLayerProperties> | GeoJSON.FeatureCollection<GeoJSON.Geometry, TLayerProperties>;

/**
 * Custom layer data, if needed
 * @public
 */
export declare type TLayerProperties = {
    [name: string]: any;
} | null;

/**
 * Currently supported layer types
 * @public
 */
export declare type TLayerType = "meta" | "line" | "symbol";

export declare type TMetaAddressRel = "author" | "organisation" | "support" | "contact_person" | "organizer" | "lessor";

export declare type TMetaGeometryType = "wkt" | "linestring";

export declare type TMetaItemType = "Hotel" | "Event" | "Gastro" | "Tour" | "POI" | "City" | "Area" | "Package" | "Article";

export declare type TMetaMediaObjectRatio = "" | "3:2" | "4:3" | "16:9";

export declare type TMetaMediaObjectRel = "default" | "gallery" | "download" | "video" | "audio" | "qrcode" | "booking" | "socialmedia" | 
    "rating" | "barrierfree" | "print" | "summer" | "winter" | "mobile" | "pages" | "homepage" | "other";

export declare type TMetaRequestType =  "All" | "Hotel" | "Event" | "Gastro" | "Tour" | "POI" | "City" | "Area" | "Package" | "Article";

export declare type TMetaStatusType = "OK" | "INVALID_LICENSE" | "INVALID_EXPERIENCE" | "INVALID_REQUEST" | "SERVER_ERROR";

export declare type TMetaTextRel = "teaser" | "destination" | "date" | "dayoff" | "directions" | "barrierfree" | "long" | "short" | "highlight" | 
    "insidertip" | "openinghours" | "equipment" | "roominfo" | "pricerange" | "classification" | "convention" | "games" | "styles" | 
    "meals" | "mealsavail" | "paymentinfo" | "clubinfo" | "guestinfo" | "cinemainfo" | "program" | "parking" | "rentalcar" | "schedule" | 
    "additional" | "details" | "kitchen";

export declare type TMetaTextType = "text/html" | "text/plain";

/**
 * Flag which indicates, if the Layer should be or is saved in the Layer-Cache.
 * @public
 */
export declare type TPersistType = "persist" | "saved" | "none";

/**
 * @public
 */
export declare type TPopupAnchor = "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export { }

export as namespace Done
