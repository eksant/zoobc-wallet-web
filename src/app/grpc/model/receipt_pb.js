/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var model_batchReceipt_pb = require('../model/batchReceipt_pb.js');
goog.object.extend(proto, model_batchReceipt_pb);
goog.exportSymbol('proto.model.Receipt', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.Receipt = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.Receipt, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.Receipt.displayName = 'proto.model.Receipt';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.Receipt.prototype.toObject = function(opt_includeInstance) {
  return proto.model.Receipt.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.Receipt} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.Receipt.toObject = function(includeInstance, msg) {
  var f, obj = {
    batchreceipt: (f = msg.getBatchreceipt()) && model_batchReceipt_pb.BatchReceipt.toObject(includeInstance, f),
    rmr: msg.getRmr_asB64(),
    rmrindex: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.Receipt}
 */
proto.model.Receipt.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.Receipt;
  return proto.model.Receipt.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.Receipt} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.Receipt}
 */
proto.model.Receipt.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new model_batchReceipt_pb.BatchReceipt;
      reader.readMessage(value,model_batchReceipt_pb.BatchReceipt.deserializeBinaryFromReader);
      msg.setBatchreceipt(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setRmr(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setRmrindex(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.Receipt.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.Receipt.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.Receipt} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.Receipt.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBatchreceipt();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      model_batchReceipt_pb.BatchReceipt.serializeBinaryToWriter
    );
  }
  f = message.getRmr_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getRmrindex();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional BatchReceipt BatchReceipt = 1;
 * @return {?proto.model.BatchReceipt}
 */
proto.model.Receipt.prototype.getBatchreceipt = function() {
  return /** @type{?proto.model.BatchReceipt} */ (
    jspb.Message.getWrapperField(this, model_batchReceipt_pb.BatchReceipt, 1));
};


/** @param {?proto.model.BatchReceipt|undefined} value */
proto.model.Receipt.prototype.setBatchreceipt = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.model.Receipt.prototype.clearBatchreceipt = function() {
  this.setBatchreceipt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.model.Receipt.prototype.hasBatchreceipt = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes RMR = 2;
 * @return {!(string|Uint8Array)}
 */
proto.model.Receipt.prototype.getRmr = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes RMR = 2;
 * This is a type-conversion wrapper around `getRmr()`
 * @return {string}
 */
proto.model.Receipt.prototype.getRmr_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getRmr()));
};


/**
 * optional bytes RMR = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getRmr()`
 * @return {!Uint8Array}
 */
proto.model.Receipt.prototype.getRmr_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getRmr()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.Receipt.prototype.setRmr = function(value) {
  jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional uint32 RMRIndex = 3;
 * @return {number}
 */
proto.model.Receipt.prototype.getRmrindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.model.Receipt.prototype.setRmrindex = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


goog.object.extend(exports, proto.model);