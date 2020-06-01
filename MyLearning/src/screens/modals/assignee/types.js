import { ListItemAssignee, } from '@src/models'
export { ListItemAssignee, }

export type VMProps = {
  currentAssignee: ListItemAssignee,
  onNavBack: () => void,
  onSelectAssignee: (campaign: ListItemAssignee) => void,
}

export type VProps = VMProps & {
  rdx: {
    listAssignees: ListItemAssignee[],
    onFetch: () => void,
  },
  currentAssigneeKey?: string,
  filteredListAssignees: ListItemAssignee[],
  searchText: string,
  setSearchText: (text: string) => void,
  _onSelectAssignee: (item: ListItemAssignee) => void,
}
