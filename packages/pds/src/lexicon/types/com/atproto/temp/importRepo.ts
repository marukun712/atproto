/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express'
import stream from 'stream'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { lexicons } from '../../../../lexicons'
import { isObj, hasProp } from '../../../../util'
import { CID } from 'multiformats/cid'
import { HandlerAuth } from '@atproto/xrpc-server'

export interface QueryParams {
  /** The DID of the repo. */
  did: string
}

export type InputSchema = string | Uint8Array

export interface HandlerInput {
  encoding: 'application/vnd.ipld.car'
  body: stream.Readable
}

export interface HandlerSuccess {
  encoding: 'text/plain'
  body: Uint8Array | stream.Readable
  headers?: { [key: string]: string }
}

export interface HandlerError {
  status: number
  message?: string
}

export type HandlerOutput = HandlerError | HandlerSuccess
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
  auth: HA
  params: QueryParams
  input: HandlerInput
  req: express.Request
  res: express.Response
}
export type Handler<HA extends HandlerAuth = never> = (
  ctx: HandlerReqCtx<HA>,
) => Promise<HandlerOutput> | HandlerOutput