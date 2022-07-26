export interface OwnedNfts {
  //List of user's nfts with data(contract address, nft ID, balance of token, uri but is all nested)
  ownedNfts: Nfts[]
  totalCount: number
  blockHash: string
}
export interface Nfts {
  contract: Address
  id: Id
  balance: string
  tokenUri: TokenUris
}
export interface Address {
  address: string
}
export interface Id {
  tokenId: string
}
export interface TokenUris {
  raw: string
}

export interface Metadata {
  description: string
  image: string
  name: string
}
export interface IdToMetadataMap {
  [key: string]: Metadata
}
