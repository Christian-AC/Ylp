from flask.cli import AppGroup
from .users import seed_users, undo_users
from .business import seed_businesses, undo_businesses
from .images import seed_image, undo_image
from .reviews import seed_review, undo_review

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_businesses()
    seed_image()
    seed_review()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_businesses()
    undo_image()
    undo_review()
    # Add other undo functions here
