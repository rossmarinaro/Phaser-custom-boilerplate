export type internet = { connected: boolean, proxy: boolean }

export type dimension2D = { width: number, height: number }

export type setup = {
    key: string
    physics: {
        arcade: { gravity: { y: number }, useTicker: boolean, debug: Readonly<boolean> },
        matter: { gravity: {y: number}, Body: any, Bodies: any, debug: Readonly<boolean> }
    }
}


export type shopItems = string[]

export type shadows = {
    shadow1: number
    shadow2: number
    shadow3: number
    shadow4: number
    shadow5: number
    shadow6: number
    shadow7: number
    shadow8: number
    shadow9: number
    shadow10: number
    shadow11: number
    shadow12: number
} 


export type itemsAquired = {
    rolling_pin2: boolean
    rigatoni_rocket_launcher: boolean
    spaghetti_whip: boolean
    pickaxe: boolean
    pasta_pump: boolean
    tongs: boolean
    ladle: boolean
    oven_mit: boolean
    jar: boolean
    pastina_star: boolean
} 


export type inventoryQuantities = {
    shroom_tile: number
    beer_tile: number
    champagne: number
    coffee: number
    sushi: number
    salmon_nigiri_tile: number
    ikura_maki_tile: number
    muffin: number
    magic_flours: number
    bong: number
    brownie: number
    keywi: number
} 

export type ammo = {
    automac1000: number
    penne_pistol: number
    rigatoni_rocket_launcher: number
    grenade: number
    dynamite: number
} 


export type player = {
    character: string
    self: Phaser.GameObjects.GameObject | null
    color: string
    human: boolean
    anim: string | null
    unMasked: boolean
} 

export type selects = {
    A: {
        key: string
        selected: boolean
    }, 
    B: {
        key: string
        selected: boolean
    }, 
    C: {
        key: string
        selected: boolean
    }, 
    D: {
        key: string
        selected: boolean
    }
} 

//------------------------ config

export type orientation = {
    on: (event: string, callback: any, state: any) => void
    off: (event: string, callback: any, state: any) => void
    lock: (aspectRatio: OrientationLockType) => void
    unlock: () => void
}

export type input = {
    virtual: boolean
    gamepad: boolean
    type: string
    mode: string
}
export type physics = any
export type scale = any
 


export type isPreloaded = {
    //ui: false,
    BassUI: boolean
}

 
export type account = {
    username: string | null
    loggedIn: boolean
    paid: boolean,
    signUp: Function
    login: Function
    logout: Function
}

export type joystick = {
    A: {
      self: any | null
      base?: Phaser.GameObjects.Arc | null
      thumb?: Phaser.GameObjects.Arc
    }
  }