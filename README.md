# ansible-min

A minimal example of an Ansible driven setup

---

## Ansible Install/Setup

### Generate ssh key on control node
```
ssh-keygen -t ed25519 -C "ansible@control" -f ~/.ssh/id_ansible_ed25519
```

### Add key to remote host
```
ssh-copy-id -i ~/.ssh/id_ansible_ed25519.pub ubuntu@srv.ex.com
```

### Verify passwordless authentication
```
ssh -i ~/.ssh/id_ansible_ed25519 ubuntu@srv.ex.com
```

### On the remote host, enable passwordless sudo for the user
```
sudo EDITOR=vim visudo
```
Add the following to the file.
```
ubuntu ALL=(ALL) NOPASSWD: ALL
```

### Ensure ufw is installed an open for ssh (so we don't lock out)
```
sudo apt install ufw -y
ufw allow 22
```

### Install Ansible on the control node (ubuntu example)
```
sudo apt update
sudo apt install -y python3-pip python3-venv build-essential
python3 -m venv ~/ansible-venv && source ~/ansible-venv/bin/activate
pip install --upgrade pip
pip install ansible
```

---

## Run the playbook
```
# syntax check
ansible-playbook --syntax-check site.yml

# dry-run (no changes)
ansible-playbook site.yml --check

# run for real
ansible-playbook site.yml -v # -vvv for more debug
```

### Verifyication

Browse: http://srv.ex.com (or defined host) and should see the nginx index page.

Server Side Check
```
# check nginx
sudo systemctl status nginx
# check the file
sudo cat /var/www/html/index.html
```

Ansible ad hoc commands
```
# ping
ansible web -m ping
# run a command
ansible web -a "uptime"
```

---

## Security

ALready using ssh keys to access. Would be a good idea to avoid agent forwarding unless required.

### Use ansible vault
```
# create vault file
ansible-vault create group_vars/all_vault.yml
# edit later
ansible-vault edit group_vars/all_vault.yml
# run playbook with vault password prompt
ansible-playbook site.yml --ask-vault-pass
```

---

## Notes

add TLS via letsencrypt with certbot role

integrate with git and CI pipeline

use ansible-pull for pull based deploy on servers

### To leave python environment created during test
```
deactivate
```
