const download_folder = './downloads/';

export const get_accounts = () => {
  return require(download_folder+'accounts.json')
}

export const get_friends = (account) => {
  return require(download_folder+account+'/friends.json')
}

export const get_profile = (account) => {
  return require(download_folder+account+'/profile.json')
}

export const get_pinboard = (account) => {
  return require(download_folder+account+'/pinboard.json')
}

export const get_messages = (account) => {
  return {
    inbox: require(download_folder+account+'/messages_inbox.json'),
    outbox: require(download_folder+account+'/messages_outbox.json'),
  }
}
