<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;
require APPPATH . 'libraries\RestController\RestController.php';

class Story extends RestController {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	function __construct($config = 'rest') {
    parent::__construct($config);
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
  }

  //show
  function index_get($id = NULL) {
    if (!$id) {
      $user = $this->db->get('story')->result();
    }
    else {
      $this->db->where('id', $id);
      $user = $this->db->get('story')->result();
      $user = $user[0];
    }
    $this->response($user, 200);
  }

  // insert
  function index_post() {
      $data = array(
        'story_by'          => $this->post('story_by'),
        'story_text'        => $this->post('story_text'),
      );
      $insert = $this->db->insert('story', $data);
      if ($insert) {
        $this->response($data, 200);
      } else {
        $this->response(array('status' => 'fail', 502));
      }
  }

  // update
    function index_put($id) {
        $data = array(
          'title'       => $this->put('title'),
          'description' => $this->put('description'),
          'published'   => $this->put('published'),
        );
        $this->db->where('id', $id);
        $update = $this->db->update('story', $data);
        if ($update) {
          $this->response($data, 200);
        } else {
          $this->response(array('status' => 'fail', 502));
        }
    }

    // delete
    function index_delete($id = NULL) {
      if ($id) {
        $this->db->where('id', $id);
      }
      $this->db->where('id !=', 0);
      $delete = $this->db->delete('story');
      if ($delete) {
        $this->response(array('status' => 'success'), 201);
      } else {
        $this->response(array('status' => 'fail', 502));
      }
    }

}
