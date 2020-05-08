<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;
require APPPATH . 'libraries\RestController\RestController.php';

class User extends RestController {

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
  }

  //show
  function index_get($id_user = NULL) {
    if (!$id_user) {
      $user = $this->db->get('portal_user_db')->result();
    } else {
      $this->db->where('id_user', $id_user);
      $user = $this->db->get('portal_user_db')->result();
    }
    $this->response($user, 200);
  }

  // insert
  function index_post() {
      $data = array(
        'nim'           => $this->post('nim'),
        'nama'          => $this->post('nama'),
        'id_jurusan'    => $this->post('id_jurusan'),
        'alamat'        => $this->post('alamat'));
      $insert = $this->db->insert('mahasiswa', $data);
      if ($insert) {
        $this->response($data, 200);
      } else {
        $this->response(array('status' => 'fail', 502));
      }
  }

  // update
    function index_put() {
        $nim = $this->put('nim');
        $data = array(
          'nim'       => $this->put('nim'),
          'nama'      => $this->put('nama'),
          'id_jurusan'=> $this->put('id_jurusan'),
          'alamat'    => $this->put('alamat'));
        $this->db->where('nim', $nim);
        $update = $this->db->update('mahasiswa', $data);
        if ($update) {
          $this->response($data, 200);
        } else {
          $this->response(array('status' => 'fail', 502));
        }
    }

    // delete
    function index_delete() {
      $nim = $this->delete('nim');
      $this->db->where('nim', $nim);
      $delete = $this->db->delete('mahasiswa');
      if ($delete) {
        $this->response(array('status' => 'success'), 201);
      } else {
        $this->response(array('status' => 'fail', 502));
      }
    }

}
