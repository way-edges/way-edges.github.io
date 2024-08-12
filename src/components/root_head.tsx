'use client'

import React from 'react'
import { mediaStyles } from './media'
import Head from 'next/head'

function RootHead() {
  return (
    <Head>
      <style key="fresnel-css" dangerouslySetInnerHTML={{ __html: mediaStyles }} type="text/css" />
    </Head>
  )
}

export default RootHead
