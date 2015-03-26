@extends('master')

@section('content')
<form class="form-inline" action="/login" method="post">
  <div class="form-group">
    <label class="sr-only" for="email">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
  </div>
  <div class="form-group">
    <label class="sr-only" for="password">Password</label>
    <input type="password" class="form-control" id="password" placeholder="Password" name="password">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-default">Sign in</button>
</form>
@stop