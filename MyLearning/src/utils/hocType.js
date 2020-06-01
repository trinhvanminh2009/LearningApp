import { ComponentType, } from 'react'

type UnaryFn<A, R> = (a: A) => R

export type ComponentEnhancer<Base, Enhanced> = UnaryFn<ComponentType<Base>, ComponentType<Enhanced>>
