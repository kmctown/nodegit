/*
Copyright (c) 2011, Tim Branyen @tbranyen <tim@tabdeveloper.com>
*/

#include <v8.h>
#include <node.h>
#include <node_events.h>

#include <git2.h>

#include "reference.h"
#include "error.h"
#include "repo.h"
#include "oid.h"
#include "commit.h"
#include "revwalk.h"

using namespace node;
using namespace v8;

extern "C" void init(Handle<Object> target) {
  HandleScope scope;

  Reference::Initialize(target);
  Error::Initialize(target);
  Oid::Initialize(target);
  Repo::Initialize(target);
  Commit::Initialize(target);
  RevWalk::Initialize(target);
}