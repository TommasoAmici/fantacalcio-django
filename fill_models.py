from main.models import *
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
import random
import names


User = get_user_model()

# create some Users
for i in range(10):
    User.objects.create(
        username='user_{}'.format(i),
        email='user_{}@mail.com'.format(i),
        password='password'
    )


# create some Leagues
for i in range(3):
    League.objects.create(
        name='league_{}'.format(i),
        creator=User.objects.get(username='user_{}'.format(i))
    )


# create some bonuses
Bonus.objects.create(name='gol')
Bonus.objects.create(name='assist')
Bonus.objects.create(name='autogol')


# create some roles
Role.objects.create(role='P')
Role.objects.create(role='D')
Role.objects.create(role='C')
Role.objects.create(role='A')


# create some performances
for i in range(20):
    p=Performance.objects.create(
        vote=random.randint(0,10),
        fantavote=random.randint(0,10),
        against_team_irl=random.choice(['juve', 'milan', 'napoli', 'roma']),
        matchday=random.randint(1,38)
    )
    p.bonuses.add(Bonus.objects.get(name=random.choice(['gol', 'assist', 'autogol'])))
    p.save()


# create some players
for i in range(20):
    p=Player.objects.create(
        name=names.get_full_name()
    )


# create some seasons
def make_season(i):
    s=Season.objects.create(
        player=Player.objects.all()[i],
        team_irl=random.choice(['paperopoli', 'topolinia', 'gotham city', 'metropolis']),
        price=random.randint(1,40)
    )
    s.roles.add(Role.objects.get(role=random.choice(['P','D','C','A'])))
    for i in range(10):
        s.performances.add(Performance.objects.all()[random.randint(0,19)])
    s.save()


for j in range(20):
    for i in range(20):
        make_season(i)


# create some teams
for i in range(10):
    t=Team.objects.create(
        user=User.objects.get(username='user_{}'.format(i)),
        name=names.get_last_name(),
        league=League.objects.all()[random.randint(0,2)],
        history=random.choice([None, 'la storia della mia squadra'])
    )
    for i in range(5):
        r = Roster.objects.create(
            player=Player.objects.all()[i],
            team=t,
            price_paid=random.randint(1,50)
        )
        r.save()
    t.save()
